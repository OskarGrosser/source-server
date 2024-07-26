import * as path from "https://deno.land/std@0.207.0/path/mod.ts";

let docRoot = path.dirname(import.meta.url);

export function setDocRoot(path) {
  docRoot = path;
}

export function getDocRoot() {
  return docRoot;
}
