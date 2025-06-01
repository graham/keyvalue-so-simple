import {
  GenericDataModel,
  GenericMutationCtx,
  GenericQueryCtx,
} from "convex/server";

type RunQueryCtx = {
  runQuery: GenericQueryCtx<GenericDataModel>["runQuery"];
};
type RunMutationCtx = {
  runMutation: GenericMutationCtx<GenericDataModel>["runMutation"];
};

export class KeyValueStore {
  constructor(private component: any) {}

  async countKeys(ctx: RunQueryCtx) {
    return await ctx.runQuery(this.component.public.countKeys);
  }

  async getKeysForUserId(
    ctx: RunQueryCtx,
    userId: string,
  ): Promise<Record<string, string>> {
    return await ctx.runQuery(this.component.public.getKeysForUserId, {
      userId: userId,
    });
  }

  async setKeyForUserId(
    ctx: RunMutationCtx,
    userId: string,
    key: string,
    value: string,
  ) {
    return await ctx.runMutation(this.component.public.setKeyForUserId, {
      userId: userId,
      key: key,
      value: value,
    });
  }
}
