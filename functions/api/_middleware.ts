export const onRequest: PagesFunction = async (context) => {
  const req = context.request as Request;

  const auth = req.headers.get("Authorization");

  if (auth !== "Example auth header") {
    return new Response("Missing or invalid auth header", {
      status: 401,
    });
  }

  return context.next();
};
