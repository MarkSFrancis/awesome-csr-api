import { Env } from "../../api/env";
import { appRouter } from "../../api/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const onRequestGet: PagesFunction<Env> = async (req) => {
  return fetchRequestHandler({
    endpoint: "/api",
    req: req.request,
    router: appRouter,
    createContext: () => {
      return req.env;
    },
  });
};
