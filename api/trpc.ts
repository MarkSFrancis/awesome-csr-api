import { initTRPC } from "@trpc/server";
import { Env } from "./env.js";

const trpc = initTRPC.context<Env>().create();

export const procedure = trpc.procedure;
export const router = trpc.router;
