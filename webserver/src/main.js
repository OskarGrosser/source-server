import * as path from "https://deno.land/std@0.207.0/path/mod.ts";
import * as extMime from "./extension-mimetype.js";

const docRoot = path.join(
  path.dirname(path.fromFileUrl(import.meta.url)),
  "../public"
);

const handlers = [serveInfo, serveSimple];
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

function serveInfo(request, skip) {
  const url = new URL(request.url);
  if (url.pathname !== "/info.json") {
    return skip();
  }

  const headers = new Headers({
    "Content-Type": "application/json; charset=UTF-8"
  });
  return new Response(JSON.stringify(getInfo()), { status: 200, headers });
}

function getInfo() {
  function getDateTimeUtc() {
    function padZero(input, padCount) {
      return String(input).padStart(padCount, "0");
    }

    const now = new Date();

    const date = [
      now.getUTCFullYear(),
      padZero(now.getUTCMonth(), 2),
      padZero(now.getUTCDate(), 2)
    ].join("-");
    const time = [
      padZero(now.getUTCHours(), 2),
      padZero(now.getUTCMinutes(), 2),
      padZero(now.getUTCSeconds(), 2)
    ].join(":");

    return `${date} ${time}Z`;
  };

  return {
    "datetime": getDateTimeUtc(),
    "title": "PowerShell",
    "tags": "Test, WIP"
  };
}
