import { GenericId } from "convex/values";
import { v } from "convex/values";
import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server";
import { GenericDataModel, GenericMutationCtx } from "convex/server";

export const countKeys = query({
  args: {},
  handler: async (ctx: QueryCtx, args) => {
    return (await ctx.db.query("keyValue").collect()).reduce(
      (acc, _k) => acc + 1,
      0,
    );
  },
});

export const getKeysForUserId = query({
  args: { userId: v.string() },
  handler: async (ctx: QueryCtx, args) => {
    let records = await ctx.db
      .query("keyValue")
      .filter((q) => q.eq(q.field("forUser"), args.userId))
      .collect();

    let mapOfKeys = records.reduce(
      (acc: Record<string, string>, item: { key: string; value: string }) => {
        acc[item.key] = item.value;
        return acc;
      },
      {},
    );

    return mapOfKeys;
  },
});

export const setKeyForUserId = mutation({
  args: { userId: v.string(), key: v.string(), value: v.string() },
  handler: async (ctx: MutationCtx, args) => {
    let previousValue = await ctx.db
      .query("keyValue")
      .filter((q) =>
        q.and(
          q.eq(q.field("forUser"), args.userId),
          q.eq(q.field("key"), args.key),
        ),
      )
      .unique();

    if (previousValue) {
      await ctx.db.patch(previousValue._id, { value: args.value });
    } else {
      await ctx.db.insert("keyValue", {
        forUser: args.userId,
        key: args.key,
        value: args.value,
      });
    }
  },
});
