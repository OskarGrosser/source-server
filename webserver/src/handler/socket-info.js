import * as path from "https://deno.land/std@0.207.0/path/mod.ts";
import { debounce } from "https://deno.land/std@0.224.0/async/debounce.ts";
import { getDocRoot } from "../docroot.js";
import getDateTimeUtc from "../get-datetime-utc.js";
import getInfo from "../get-info.js";

let idCounter = 0;
export default function socketInfo(request, skip) {
  if (request.headers.get("upgrade") !== "websocket") {
    return skip();
  }

  const { socket, response } = Deno.upgradeWebSocket(request);

  const id = idCounter++;
  let intervalId;
  const watcher = Deno.watchFs(path.join(getDocRoot(), "../resources/"));
  const sendUpdate = debounce(() => {
    socket.send(JSON.stringify(getInfo()));
  }, 50);

  socket.addEventListener("open", async () => {
    console.log(`Client ${id} connected`);

    // Initialize
    socket.send(JSON.stringify(getInfo()));

    // Update
    intervalId = setInterval(() => {
      socket.send(JSON.stringify({
        datetime: getDateTimeUtc()
      }));
    }, 250);
    for await (const event of watcher) {
      if (event.kind !== "access") {
        sendUpdate();
      }
    }
  });
  socket.addEventListener("close", () => {
    console.log(`Client ${id} disconnected`);
    clearInterval(intervalId);
    watcher.close();
  });

  return response;
}
