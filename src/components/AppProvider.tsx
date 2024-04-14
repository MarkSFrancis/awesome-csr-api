import { RouterProvider, createRouter } from "@tanstack/react-router";
import { FC } from "react";
import { routeTree } from "../routeTree.gen";
import { ApiProvider } from "../api/ApiProvider";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppProvider: FC = () => {
  return (
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  );
};
