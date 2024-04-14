import { publicProcedure, router } from "../trpc";
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
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const post = {
        id: ++id,
        ...input,
      };
      db.posts.push(post);
      return post;
    }),
  getAll: publicProcedure.query(async () => {
    return db.posts;
  }),
});
