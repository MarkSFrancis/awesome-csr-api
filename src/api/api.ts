import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../api/router";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: import.meta.env.PROD,
      refetchOnWindowFocus: import.meta.env.PROD,
      retry: import.meta.env.PROD ? 3 : 0,
      refetchOnReconnect: import.meta.env.PROD,
    },
  },
});

export const trpc = createTRPCReact<AppRouter>();
