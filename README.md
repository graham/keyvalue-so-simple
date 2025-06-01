# Key Value, So Simple

This module isn't intended to be anything but a learning exercise to understand how convex Components ( https://www.convex.dev/components ) can be built. While the current examples are SUPER impressive, I was having trouble reasoning about how simple components can be. Even the sharded counter, while graceful, required me to think about the abstraction of components AND the abstraction of a sharded counter at the same time.

## What this component does

It provides one table, an api, and a client for interacting with a `per user key value store`. It is not intended to be feature complete, but instead, simply a way to understand how to write your own Convex Components.

## Files you should look at, in order.

### In the core:

1. The component schema, [./src/component/schema.ts](./src/component/schema.ts)
2. The public API for the component schema, [./src/component/public.ts](./src/component/public.ts)
3. The client that the host app will use to interact with the public API, [./src/client/index.tsx](./src/client/index.tsx)
4. Take a moment to read [./src/component/convex.config.ts](./src/component/convex.config.ts) to see how this is exported.

### In the example application.

1. Import and use the component [./example/convex/convex.config.ts](./example/convex/convex.config.ts)
2. Instantiate the client for the component and expose it's features to the example application [./example/convex/keyvalue.ts](./example/convex/keyvalue.ts)
3. Use the newly exported convex queries/mutations [./example/src/app/page.tsx](./example/src/app/page.tsx)

Doing this in order helps understand the flow that best helped me.

If you have any comments or requested changes, please don't hesitate to ask, that said, the goal of this project is to be as __understandable__ as possible not as feature rich as possible.

## Running the example:

In the root directory `npm run build` then in the example directory run both `npm run dev:backend` and `npm run dev:frontend` and visit [http://localhost:3000](http://localhost:3000)
