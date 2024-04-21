import { procedure, router } from "../trpc.js";
import { z } from "zod";

let id = 0;

const db = {
  posts: [
    {
      id: ++id,
      title: "hello",
    },
  ],
};

export const postsRouter = router({
  create: procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const post = {
        id: ++id,
        ...input,
      };
      db.posts.push(post);
      return post;
    }),
  getAll: procedure.query(async () => {
    return db.posts;
  }),
});
