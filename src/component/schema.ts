import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  keyValue: defineTable({
    forUser: v.string(),
    key: v.string(),
    value: v.string(),
  }),
});
