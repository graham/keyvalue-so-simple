import { v } from "convex/values";

import { query, mutation } from "./_generated/server";

import { KeyValueStore } from "keyvalue-so-simple";

import { components } from "./_generated/api";

const store = new KeyValueStore(components.keyvalueSoSimple);

export const countKeys = query({
  args: {},
  handler: async (ctx, _args) => {
    return await store.countKeys(ctx);
  },
});

export const getKeysForUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await store.getKeysForUserId(ctx, args.userId);
  },
});

export const setKeyForUserId = mutation({
  args: { userId: v.string(), key: v.string(), value: v.string() },
  handler: async (ctx, args) => {
    return await store.setKeyForUserId(ctx, args.userId, args.key, args.value);
  },
});
