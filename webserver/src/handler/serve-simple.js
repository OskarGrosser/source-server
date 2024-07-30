import * as path from "https://deno.land/std@0.207.0/path/mod.ts";
import * as extMime from "../extension-mimetype.js";
import { getDocRoot } from "../docroot.js";

export function serveSimple(request, skip) {
  const url = new URL(request.url);
  const ext = /\.\w+$/.exec(url.pathname)?.[0].substring(1) ?? "";

  return Deno.open(path.join(getDocRoot(), url.pathname))
    .then(fsFile => {
      const type = extMime.getMimeType(ext) ?? "text/plain";
      const headers = new Headers({
        "Content-Type": `${type}; charset=UTF-8`
      });

      return new Response(fsFile.readable, { status: 200, headers });
    })
    .catch(() => skip());
}
