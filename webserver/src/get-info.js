import * as path from "https://deno.land/std@0.207.0/path/mod.ts";
import { getDocRoot } from "./docroot.js";
import getDateTimeUtc from "./get-datetime-utc.js";

export default function getInfo() {
  return {
    datetime: getDateTimeUtc(),
    items: JSON.parse(Deno.readTextFileSync(path.join(getDocRoot(), "../resources/items.json")))
  };
}
