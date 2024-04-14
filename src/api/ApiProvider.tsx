import { httpBatchLink } from "@trpc/react-query";
import { queryClient, trpc } from "./api";
import { QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api",
      headers() {
        return {
          authorization: "Example auth header",
        };
      },
    }),
  ],
});

export const ApiProvider: FC<PropsWithChildren> = (props) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
