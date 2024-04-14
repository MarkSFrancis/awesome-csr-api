import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../api/api";
import { Button } from "../components/Button";

export const Route = createFileRoute("/posts")({
  component: AboutComponent,
});

function AboutComponent() {
  const allPostsQuery = trpc.posts.getAll.useQuery();

  return (
    <div className="p-2 flex justify-center">
      <div className="w-full max-w-screen-md flex flex-col items-start gap-2">
        <h3 className="text-2xl">Posts</h3>
        {allPostsQuery.isFetching && <p>Loading...</p>}
        {allPostsQuery.isError && (
          <output className="text-red-400 w-full">
            {JSON.stringify(allPostsQuery.error, null, 2)}
          </output>
        )}
        {allPostsQuery.isSuccess && (
          <ul className="self-stretch">
            {allPostsQuery.data.map((p) => (
              <li key={p.id}>
                <div className="rounded-md border-2 p-2">
                  <div className="flex justify-between">
                    <h3 className="text-xl">{p.title}</h3>
                    <div>ID: {p.id}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Button
          disabled={allPostsQuery.isFetching}
          onClick={() => allPostsQuery.refetch()}
        >
          Refetch
        </Button>
      </div>
    </div>
  );
}
