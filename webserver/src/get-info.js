import * as path from "https://deno.land/std@0.207.0/path/mod.ts";
import { getDocRoot } from "./docroot.js";
import getDateTimeUtc from "./get-datetime-utc.js";

export default function getInfo() {
  let info = {};
  try {
    const infoPath = path.join(getDocRoot(), "../resources/info.json");
    info = JSON.parse(Deno.readTextFileSync(infoPath));
  } catch (error) {
    console.error("Could not get info: Unreadable info.json\n");
  }

  return {
    ...info,
    datetime: getDateTimeUtc()
  };
}
