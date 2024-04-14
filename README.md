# Awesome CSR DX

This repo is an attempt to create the best DX possible for React apps that have a BFF API.

# Why?

A large portion of development on the web does not benefit from SSR (such as no need for SEO, no need for HTTP streaming, etc.) CSR tooling has come on significantly since the inception of [vite](https://vitejs.dev/), but unfortunately the community still has no answer for connecting such an app to an API, except by treating them as two separate projects.

As such, many developers give up on CSR and end up building with SSR for no reason other than needing an API for their FE. This makes hosting much more complex, wastes CPU on unnecessary renders (which, like all unnecessary energy expenditure, impacts the global climate), and worsens the DX, despite offering no clear advantages.

This project is an attempt to fix this, by showing developers that there is a better way. Our objective is to create a DX so good, that SSR becomes a tool that, once again, you will only reach for when you truly need it.

# Outcomes

- Typescript everwhere, via `Cloudflare miniflare` + `vite` (though there are some exceptions for various config files, like `tailwind.config.js`)
- End-to-end type safety, across the FE and BE, via `Typescript` + `tRPC`. If you rename an API endpoint or change its schema, you'll get instant TS warnings in the front-end. You'll also get autocomplete for all the body's properties, methods, etc.
- Type-safe routing, via `@tanstack/router`
- Modern CSS tooling, via `tailwind`
- Hot module reload in dev mode, but bundled and minified in production, via `vite`
- Lazy-loading, so if you have extremely complex payloads on certain routes, you can switch to lazy-loading for just those routes, via `@tanstack/router` + `vite`
- Scale-to-zero, so that your API costs you nothing when you're not using it, via `Cloudflare workers`
- Static hosting for free without a custom server, so that if your users don't invoke your API, you'll incur no cost, via `Cloudflare pages`
- Automatic CI/CD deployments, including automatic preview environments for PRs, via `Cloudflare pages`
- API endpoints are bundled together by default for simplicity in hosting and debugging, but you have the ability to drop out into a separately bundled API endpoint if you have a particularly large bundle (such as needing to parse an Excel document), via `Cloudflare pages functions`
- Access to a full cloud provider's infrastructure for advanced scenarios, such as custom queues, SQL databases, and more, via `Cloudflare wrangler`
- 

# Technologies

- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [@tanstack/router](https://tanstack.com/router/latest)
- [Tailwind](https://tailwindcss.com/)
- [tRPC](https://trpc.io/)
- [@tanstack/react-query](https://tanstack.com/query)
- [Cloudflare Pages](https://developers.cloudflare.com/pages)

# Running on your local

## Prerequisites:

- Git
- NodeJS

1. Clone the project onto your local machine
1. Open a shell at the root of the project and run `npm i`
1. Run `npm run dev`
1. Open another shell at the root of the project and run `npx wrangler pages dev`

# Deploying to Cloudflare

1. Push to `main`
