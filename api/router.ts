import { postsRouter } from "./posts/router.js";
import { procedure, router } from "./trpc.js";
import { z } from "zod";

export const appRouter = router({
  posts: postsRouter,
  hello: procedure.input(z.string().nullish()).query(({ input }) => {
    return `hello ${input ?? "world"} from ${process.env.APP_NAME}`;
  }),
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
