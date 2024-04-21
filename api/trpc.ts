import { initTRPC } from "@trpc/server";
import { Context } from "./context.js";

const trpc = initTRPC.context<Context>().create();

export const procedure = trpc.procedure;
export const router = trpc.router;
