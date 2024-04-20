import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./api/router";
import express from "express";
import { createServer as createViteServer } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

async function createServer() {
  const app = express();

  app.use(
    "/api",
    createExpressMiddleware({
      router: appRouter,
      createContext() {
        // TODO: load from .env file
        return {
          APP_MODE: "development",
          APP_NAME: "CSR dev",
        };
      },
    })
  );

  const vite = await createViteServer({
    server: { middlewareMode: true },
    plugins: [react(), TanStackRouterVite()],
    appType: "spa", // don't include Vite's default HTML handling middlewares
  });

  app.use(vite.middlewares);

  app.listen(8787);

  console.log(`Listening on port 8787`);
}

createServer();
