import {
  NodeHTTPCreateContextFn,
  NodeHTTPRequest,
  NodeHTTPResponse,
} from "@trpc/server/adapters/node-http";
import { appRouter } from "./router.js";
import { TRPCError } from "@trpc/server";

export const createContext: NodeHTTPCreateContextFn<
  typeof appRouter,
  NodeHTTPRequest,
  NodeHTTPResponse
> = async (context) => {
  const auth = context.req.headers.authorization;

  if (auth !== "Example auth header") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return {
    user: {
      id: "1",
    },
  };
};
