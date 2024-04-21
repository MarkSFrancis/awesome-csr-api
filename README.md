# Awesome Client Side Rendering + API

Check out the demo:  
https://tanstack-router-poc.pages.dev/

This repo demonstrates what we believe to be the best developer experience available today for React web apps that have a backend for frontend (BFF) API (an API that only exists to serve this particular web app), but do not need server-side rendering (SSR). Such web apps are usually those that require authentication to access any part of the site. Examples can include business to business (B2B) web apps, internal tools, or private data entry web apps (like a fitness tracker).

# Why do we need this?

A large portion of development on the web does not benefit from SSR (such as no need for search engine optimisation (SEO), no need for HTTP streaming, etc). Client-side rendering (CSR) tooling has come on significantly since the inception of [vite](https://vitejs.dev/), but unfortunately the community still has no answer for connecting such a web app to an API, except by treating them as two separate entities.

As such, many developers give up on CSR and end up building with SSR for no reason other than needing an API for their front-end (FE), without wanting the complexity of 2 deployments to manage. This makes hosting much more complex, wastes CPU on unnecessary renders (which, like all unnecessary energy expenditure, impacts the global climate), requires the developer to support rendering on both the server and the client, and generally complicates the developer experience.

This repository sets out to demonstrate that there is a better way. It's time that SSR once again became a tool that you only reach for when you truly need it.

# What this repository offers

## Things you'd expect from a CSR app

- Type-safe routing with autocomplete on any `Link`s
- Hot module reload on local, bundled and minified in production
- Lazy-loading, so if you have extremely complex payloads on certain routes, you can switch to lazy-loading for just those routes
- Static hosting for free, so that if your users don't invoke your API, you'll incur no cost.
- Proper fallback to `/index.html` when no files / routes are found

## Especially for CSR + API

- End-to-end type safety, across the FE and BE. If you rename an API endpoint or change its schema, you'll get instant TS warnings in the front-end. You'll also get autocomplete for the API endpoint's body schema, available API endpoints, etc. You can even use your IDE's "Go to definition" when using an API endpoint from the FE, and it'll navigate to the API endpoint on the BE for you
- Authentication by default on all API endpoints. You're probably using CSR to protect non-public data, so authentication is treated as a first-class citizen
- `404` status code responses when trying to invoke API endpoints that don't exist, whilst still serving the standard CSR `index.html` fallback for any non-API route requests

## Things that aren't included here

- Cloud deployment
  - We'd recommend using any docker-host service that allows you to host NodeJS processes, or a VPS of your choosing. You could also self-host if that's your thing
- CI/CD
  - Because we don't know how you're planning to host this project, we can't really help you with CI/CD
- Serverless / pay per request
  - This model of hosting is specifically designed for people who want to self-host, which currently isn't well defined for serverless hosting models. Check your hosting provider's details for how they price requests
- Image optimisation
  - We'd recommend checking out the Vite plugin [Vite Image Optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer) for this
- OAuth
  - Check out the docs for your OAuth provider to find out how to add support for it.
  - We've provided a basic auth example which uses static authorization headers. Check out the code in `api/createContext.ts` (server-side) and `src/api/ApiProvider.tsx` (client-side)
- Role-based access control (RBAC)
  - Because `api/createContext.ts` can enrich the request context, you can add any extra information about the user you'd like (such as what roles they have)
  - The exact implementation will depend on how granular your web app's permissions model is, we've left it as out-of-scope for this repository

# Technologies we use

- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [@tanstack/router](https://tanstack.com/router/latest)
- [Tailwind](https://tailwindcss.com/)
- [tRPC](https://trpc.io/)
- [@tanstack/react-query](https://tanstack.com/query)

## Why NodeJS?

NodeJS is a tried and true method for hosting and is supported by virtually any cloud provider, or even self-hosting. Sometimes a simple docker container chucked into VPS is all you need. Or perhaps you want a really predictable and easy to manage spend. If you'd rather have downtime than a sudden high bill, a classic NodeJS instance can be a better way.

Simpler is better than overcomplicated, and NodeJS is one of the simplest ways to host.

### Using Cloudflare instead

We believe Cloudflare pages is the best way to host a CSR + API application. If you're not that bothered about the portability and freedom to self-host that you get from running plain old NodeJS, here's what you'd get by switching to Cloudflare:

- Automated CI/CD, including preview environments on PR
- Scale to zero
- Very cheap hosting, with it being easy to set up a proof of concept to show your boss at work for free
- Already a well-respected brand in the enterprise space, where many of the B2B apps that this repository is well-suited for are being created
- Enough cloud offerings to cover most common web application's needs

# Running on your local machine

## Prerequisites

- Git
- NodeJS

## Steps

1. Clone the project onto your local machine
1. Open a shell at the root of the project and run `npm i`
1. Run `npm run dev`
1. Once the dev server is running, open [http://localhost:8787](http://localhost:8787) in your browser

## Setting up deployment

If you want to deploy to your own environment, you'll need to configure your own CI/CD. The process for deploying is similar to any other deployment on NodeJS. You'll need to perform these steps as a minimum:

1. Run an install `npm ci`
1. Build the client + server applications (`npm run build:client` + `npm run build:server`). You can run these steps in parallel
1. Copy the contents of the `dist` folder, `node_modules` folder, and `package.json` file into your production environment
1. Run the app with `NODE_ENV=production npm start`

We recommend considering a development, preview, and production environment as follows:
- Development = running on a developer's local machine as they work on features
- Preview = preview builds that are deployed for each PR. You should consider automatically tearing these down when a PR is merged or after a certain amount of time has passed. You should set these up in such a way where multiple preview environments can co-exist, in order to support concurrent PRs
- Production = anything that's merged into `main`

# Going beyond 🚀

For going further than the scope of this demo, the complexity will depend on what kind of extensions you want to make.

## Extending the FE

If you want to extend just the UI / FE, you can use all the normal react tooling you're used to. You're free to add any packages, dependencies, etc, as long as they can be bundled and can run in a browser. Have fun!

If you'd like, you can even rip out the FE we have here, and the project will still deploy + operate as expected.
You'll need:

- A `tRPC` client
- Something that supports `vite`

Most JS libraries out there today already support both of these things. For example, you could use `react-router-dom` instead of `@tanstack/router`. Just update the vite plugins in `app.ts`, then update the routes to switch from `@tanstack/router` to `react-router-dom` components, and the app should work exactly as expected, with your new routing library all plugged in and ready to go!

## Extending the BE

As this is just a NodeJS app, you can use any packages as you normally would on NodeJS. The build is not minified for production, so unlike when deploying for serverless environments, you can even use packages that don't support minification. 

We do recommend that for any new API endpoints, you seek to continue to extend `tRPC`. But for anything beyond that, you can still use any standard NodeJS features. 

We're using `express` for the top-level router, so you can add your own endpoints outside of `tRPC` there. 
