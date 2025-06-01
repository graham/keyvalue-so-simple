"use client";

import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { ConvexProvider } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex as any}>{children}</ConvexProvider>;
}
