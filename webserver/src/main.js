const handlers = [];
Deno.serve({ port: 8080 }, async (request) => {
  for (const handler of handlers) {
    let useResponse = true;
    const skip = () => {
      useResponse = false;
    };

    const response = await handler(request, skip);
    if (useResponse) {
      return response;
    }
  }

  return new Response("Client error", { status: 404 });
});
