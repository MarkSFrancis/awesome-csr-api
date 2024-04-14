import { initTRPC } from "@trpc/server";
import { Env } from "./env";
const trpc = initTRPC.context<Env>().create();

export const procedure = trpc.procedure;
export const router = trpc.router;
