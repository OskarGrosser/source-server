import * as path from "https://deno.land/std@0.207.0/path/mod.ts";
import { setDocRoot } from "./docroot.js";
import serveSimple from "./handler/serve-simple.js";
import serveInfo from "./handler/serve-info.js";
import socketInfo from "./handler/socket-info.js";

setDocRoot(path.join(
  path.dirname(path.fromFileUrl(import.meta.url)),
  "../public"
));

const handlers = [socketInfo, serveInfo, serveSimple];
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
