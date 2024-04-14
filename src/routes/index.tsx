import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-2 flex justify-center">
      <div className="w-full max-w-screen-md">
        <h3 className="text-2xl">Hello!</h3>
      </div>
    </div>
  );
}
