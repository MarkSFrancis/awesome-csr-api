import "./api/dotenv.js";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./api/router.js";
import express, { Express } from "express";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { createContext } from "./api/createContext.js";

async function createFrontend(app: Express) {
  if (process.env.NODE_ENV === "production") {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const spaFiles = join(__dirname, "..", "client");

    app.use(express.static(spaFiles));
    app.get("*", (_req, res) => {
      res.sendFile(resolve(spaFiles, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const { default: react } = await import("@vitejs/plugin-react");
    const { TanStackRouterVite } = await import("@tanstack/router-vite-plugin");

    const vite = await createViteServer({
      server: { middlewareMode: true },
      plugins: [react(), TanStackRouterVite()],
    });

    app.use(vite.middlewares);
  }
}

async function createServer() {
  const app = express();

  app.use(
    "/api",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  await createFrontend(app);

  const port = process.env.PORT || 8787;
  app.listen(port);
  console.log(`Listening on port ${port}`);
}

createServer();
