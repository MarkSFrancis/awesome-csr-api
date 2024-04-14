# Awesome CSR + API

This repo is an attempt to create the best DX possible for React apps that have a BFF API (backend for frontend API - an API that only exists to serve this particular web app), but do not need SSR (server-side rendering). Such web apps are usually those that require authentication to access any part of the site. Examples can include B2B web apps, internal tools, or private data entry web apps.

# Why do we need this?

A large portion of development on the web does not benefit from SSR (such as no need for SEO, no need for HTTP streaming, etc). CSR tooling has come on significantly since the inception of [vite](https://vitejs.dev/), but unfortunately the community still has no answer for connecting such an app to an API, except by treating them as two separate entities.

As such, many developers give up on CSR and end up building with SSR for no reason other than needing an API for their FE, without wanting the complexity of 2 deployments to manage. This makes hosting much more complex, wastes CPU on unnecessary renders (which, like all unnecessary energy expenditure, impacts the global climate), requires the developer to support rendering on both the server and the client, and worsens the DX when compared to CSR.

This project is an attempt to fix this, by showing developers that there is a better way. Our objective is to create a DX so good that SSR becomes a tool that, once again, you will only reach for when you truly need it.

# Outcomes

- Typescript everwhere (though there are some exceptions for various config files, like `tailwind.config.js`)
- End-to-end type safety, across the FE and BE. If you rename an API endpoint or change its schema, you'll get instant TS warnings in the front-end. You'll also get autocomplete for the API endpoint's body schema, available API endpoints, etc. You can even use your IDE's "Go to definition" when using an API endpoint from the FE, and it'll navigate to the API endpoint on the BE for you
- Type-safe routing with autocomplete on any `Link`s
- Hot module reload on local, bundled and minified in production
- Lazy-loading, so if you have extremely complex payloads on certain routes, you can switch to lazy-loading for just those routes
- Scale-to-zero, so that your API costs you nothing when you're not using it
- Static hosting for free, so that if your users don't invoke your API, you'll incur no cost.
  - You only pay for `/api` requests, and even then, the first 10,000,000 API requests each month are free on the $5 per month Standard plan, or 100,000 each month on the Free plan. [Check out the Cloudflare workers pricing here](https://developers.cloudflare.com/workers/platform/pricing/#workers)
- Automatic CI/CD deployments, including automatic preview environments for PRs, which will never expire, at no additional cost
- Authentication by default on all API endpoints. You're probably using CSR to protect non-public data, so authentication is treated as a first-class citizen here
- Access to a cloud provider's full infrastructure offering for advanced scenarios, such as SQL databases, custom queues, key-value stores, and more, with Typescript support for interacting with all those custom resources
- Authentication to all API endpoints. For this demo, that auth header is just hard-coded to "Example auth header"
- Easy to add custom metrics / insights to (via [Cloudflare's analytics engine](https://developers.cloudflare.com/pages/functions/bindings/#analytics-engine))
- Proper fallback to `/index.html` when no files / routes are found

## Things that aren't included here

- Image optimisation
  - We'd recommend checking out the Vite plugin [Vite Image Optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer) for this
- OAuth
  - Check out the docs for your OAuth provider to find out how to add support for it.
  - We've provided a basic auth example which uses static authorization headers. Check out the code in `functions/api/_middleware.ts` (server-side) and `src/api/ApiProvider.tsx` (client-side)

# Technologies we use

- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [@tanstack/router](https://tanstack.com/router/latest)
- [Tailwind](https://tailwindcss.com/)
- [tRPC](https://trpc.io/)
- [@tanstack/react-query](https://tanstack.com/query)
- [Cloudflare Pages](https://developers.cloudflare.com/pages)

## Why Cloudflare?

We believe Cloudflare pages is the best way to host a CSR + API application.

If you believe another cloud provider offers a better alternative, we encourage you to build a proof of concept with it and let us know!

# Running on your local

## Prerequisites:

- Git
- NodeJS
- A Cloudflare account (only required if you want to deploy to your own site)

1. Clone the project onto your local machine
1. Open a shell at the root of the project and run `npm i`
1. Run `npm run dev`
1. Open another shell at the root of the project and run `npx wrangler pages dev`

# Deploying to Cloudflare

1. Push to `main`. That's it!

# Going beyond 🚀

For going further than the scope of this demo, the complexity will depend on what kind of extensions you want to make.

## Extending the FE

If you want to extend just the UI / FE, you can use all the normal react tooling you're used to. You're free to add any packages, dependencies, etc, as long as they can be bundled and can run in a browser. Have fun!

If you'd like, you can even rip out all of what we've done here.
You'll need:

- A `tRPC` client
- Something that emits static build output to `/dist`

Luckily, that covers pretty much all the tools you've already been using for CSR. You can even use NextJS with a static `export` if you're crazy enough :P

## Extending the BE

This application largely has 3 modes:

- Production (the production deployment)
- Preview (deployments used by PR previews)
- Dev (running locally on a dev machine)

1. When creating your own infrastructure, you'll need to start by deciding how you want to interact with it in each of these different modes. For example, if you're connecting to an [S3 bucket on AWS](https://aws.amazon.com/s3/), you might want a dev bucket, a preview bucket, and a production bucket.
1. If it's infrastructure being accessed via the BE API:

   1. You should update `wrangler.toml`. This can mean:

      - Adding new Cloudflare infrastructure to `.env.{mode}`. See below for an example
      - Adding new variables to `.env.{mode}.vars`
      - [Adding new secrets via the wrangler CLI](https://developers.cloudflare.com/workers/configuration/secrets/)

   1. Next, you'll need to update the environment type in `api/env.ts`

      - Adding new Cloudflare infrastructure to `.env.{mode}`
      - Adding new variables to `.env.{mode}.vars`
      - [Adding new secrets via the wrangler CLI](https://developers.cloudflare.com/workers/configuration/secrets/)

1. If it's an API interacted with directly by the FE (such as an authentication provider), you'll need to update `.env.{mode}`
1.

### Adding a Cloudflare resource

If what you need is already covered by Cloudflare's offerrings, that's great! You can just extend the `wranger.toml` file in this project, along with adding the new infrastructure to `./api/env.ts`, as per the wranger docs.

You can find a lot of Cloudflare's listed offerings, as well as how to add them to a `Pages` project in the [Bindings docs](https://developers.cloudflare.com/pages/functions/bindings/).

For example, if you want a SQL database, you could use Cloudflare's [D1](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases) offering.

1. Start by logging into Cloudflare with `npx wrangler login`
1. Then, add your database with `npx wrangler d1 create prod-d1-tutorial`. Make sure to note down the database's ID
1. Then run it again to create a 2nd DB for preview `npx wrangler d1 create preview-d1-tutorial`
1. Then run it for the 3rd time to create a final DB for dev `npx wrangler d1 create dev-d1-tutorial`
1. Next, add it to the `wrangler.toml` file:

   ```toml
   [env.preview]
   d1_databases = [
     { binding = "DB", database_name = "prod-d1-tutorial", database_id = "<UUID1>" },
   ]

   [env.production]
   d1_databases = [
       { binding = "DB", database_name = "preview-d1-tutorial", database_id = "<UUID2>" },
   ]

   [env.development]
   d1_databases = [
       { binding = "DB", database_name = "dev-d1-tutorial", database_id = "<UUID2>" },
   ]
   ```

1. You'll then need to update the `api/env.ts` file with the new database, like so:

   ```ts
   export interface Env {
     APP_NAME: string;
     DB: D1Database;
   }
   ```

1. Now you can use it in your tRPC endpoints.

   Here's an example imagining a `postsRouter` that interacts with a `"Posts"` table:

   ```ts
   import { procedure, router } from "../trpc";
   import { z } from "zod";

   type Post = {
     id: number;
     title: string;
   };

   export const postsRouter = router({
     create: procedure
       .input(z.object({ title: z.string() }))
       .mutation(async ({ ctx, input }) => {
         const ps = ctx.DB.prepare('INSERT INTO "Posts" (title) VALUES (?)');
         await ps.bind(input.title).run();
       }),
     getAll: procedure.query(async (req) => {
       const ps = req.ctx.DB.prepare('SELECT * FROM "Posts"');
       const data = await ps.all<Post>();

       return data.results;
     }),
   });
   ```

### Adding a cloudflare integration

A limited number of 3rd parties have Cloudflare integrations. These cloud providers can add support for their infrastructure via the Cloudflare dashboard. You'll need to follow their documentation to find out the steps for this process. [Check out the Cloudflare docs here](https://developers.cloudflare.com/workers/configuration/integrations/).

If you're using a database, you'll probably want a relevant [database driver](https://developers.cloudflare.com/workers/databases/connecting-to-databases/).

### Interacting with an existing API / service

The simplest way to interact with most APIs is to just use `fetch`.

For example, if you're fetching a list of todos from a 3rd party API, you might write some code like this:

```ts
import { procedure, router } from "../trpc";

export const todosRouter = router({
  getAll: procedure.query(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ⚠️ Don't forget to check for `response.ok` if appropriate
    if (!response.ok) throw new Error("Something went wrong fetching todos");

    const data: {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    }[] = await response.json();

    return data;
  }),
});
```

If you want to use an SDK that isn't simply a `fetch` wrapper, you might run into some difficulties due to how Cloudflare doesn't use NodeJS as its runtime. You can find out more about this in [Cloudflare's external services docs](https://developers.cloudflare.com/workers/configuration/integrations/external-services/)

#### Configuring the environment

For non-secret values, you can just use the environment variables.

##### Accessing from the BE

If you're accessing them from your BE, here's how to set it up:

1. Open `wrangler.toml`
1. Choose a name for your value (such as `OAUTH_URL`)
1. For each of the `env.{mode}.vars` + `vars` sections, add the relevant values for the mode, with the name set to what you decided before

   ```toml
   # Here's an example with OAUTH_URL for each mode
   [vars]
   # ...
   OAUTH_URL = 'https://development.oauth-site.com'

   [env.preview.vars]
   # ...
   OAUTH_URL = 'https://preview.oauth-site.com'

   [env.production.vars]
   # ...
   OAUTH_URL = 'https://production.oauth-site.com'
   ```

   If you have no dedicated values for a mode, you can re-use the values. For example, you might re-use the dev value for both `development` and `preview` modes. This is fine!

   ```toml
   [vars]
   # ...
   OAUTH_URL = 'https://development.oauth-site.com'

   [env.preview.vars]
   # ...
   OAUTH_URL = 'https://development.oauth-site.com'

   [env.production.vars]
   # ...
   OAUTH_URL = 'https://production.oauth-site.com'
   ```

1. Add the new key to your `api/env.ts` file

   ```ts
   export interface Env {
     // ...
     OAUTH_URL: string;
   }
   ```

1. You can now use it in any tRPC endpoint

   ```ts
   import { procedure, router } from "../trpc";
   import { z } from "zod";

   export const oauthRouter = router({
     getUrl: procedure.query(async (req) => {
       return req.ctx.OAUTH_URL;
     }),
   });
   ```

1. If you want to know more, check out the [Cloudflare environment docs](https://developers.cloudflare.com/workers/configuration/environment-variables/#environment-variables)

##### Accessing from the FE

If you're accessing them from your FE, here's how to set it up:

1. Choose a name for your value (such as `OAUTH_URL`)
1. For each of the `env.{mode}` + `.env` files, add the relevant values for the mode, with the name set to `VITE_{what you decided before}`. If you don't prefix the variable with `VITE_`, it won't be included in the bundle

   ```
   # .env
   VITE_OAUTH_URL=https://development.oauth-site.com
   ```

   ```
   # .env.preview
   VITE_OAUTH_URL=https://preview.oauth-site.com
   ```

   ```
   # .env.production
   VITE_OAUTH_URL=https://production.oauth-site.com
   ```

   If you have no dedicated values for a mode, you can re-use the values. For example, you might re-use the dev value for both `development` and `preview` modes. This is fine!

   ```
   # .env
   VITE_OAUTH_URL=https://development.oauth-site.com
   ```

   ```
   # .env.preview
   VITE_OAUTH_URL=https://development.oauth-site.com
   ```

   ```
   # .env.production
   VITE_OAUTH_URL=https://production.oauth-site.com
   ```

1. Add the new key to your `src/vite-env.d.ts` file

   ```ts
   interface ImportMetaEnv {
     // ...
     readonly VITE_OAUTH_URL: string;
   }
   ```

1. If you want to know more about this, check out the [Vite mode docs](https://vitejs.dev/guide/env-and-mode)

#### Secrets

For secret values that you don't want in source control or Cloudflare logs (such as API keys), you should use [Cloudflare secrets](https://developers.cloudflare.com/workers/configuration/secrets/)

### Adding a non-cloudflare resource

Because your BE infrastructure is outside of Cloudflare, you'll need to set up your own CI/CD scripts to deploy to the relevant infrastructure provider(s). Unfortunately, you'll have to figure out how to deploy it yourself, as we cannot provide a guide for you on interacting with your own infrastructure.

That said, we do make the following recommendations:

- Create a single "preview" environment rather than creating a new environment each time. This avoids the additional complexity that comes from needing to clean up your custom infrastructure for all preview deployments.
- Keep the variables that Cloudflare will need consistent. If they're dynamic (e.g. they change on every deployment), you'll likely need to opt-out of Cloudflare's built-in `git` integration and use [wrangler deploy](https://developers.cloudflare.com/pages/get-started/direct-upload/#deploy-your-assets) instead, so that you can inject any generated values from your infrastructure into the Cloudflare `wrangler.toml` file

### Hosting somewhere else

This project is not cloud provider agnostic. If you wish to move off cloudflare, this project likely will not help much (beyond just a POC of what might be possible). We find that the setup will vary significantly from one provider to the next, and so we cannot offer much guidance for any other cloud providers.

If you'd like to create a POC with your cloud provider, please feel free to fork this repository, but we are not currently open to being cloud provider agnostic.
