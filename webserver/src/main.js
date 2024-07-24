import * as path from "https://deno.land/std@0.207.0/path/mod.ts";

const docRoot = path.join(
  path.dirname(path.fromFileUrl(import.meta.url)),
  "../public"
);

const handlers = [serveSimple];
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

function serveSimple(request, skip) {
  const url = new URL(request.url);
  const ext = /\.\w+$/.exec(url.pathname)?.[0].substring(1) ?? "";

  return Deno.open(path.join(docRoot, url.pathname))
    .then(fsFile => {
      const type = extMime.getMimeType(ext) ?? "text/plain";
      const headers = new Headers({
        "Content-Type": `${type}; charset=UTF-8`
      });

      return new Response(fsFile.readable, { status: 200, headers });
    })
    .catch(() => skip());
}
