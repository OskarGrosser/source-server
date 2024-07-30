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

  socket.addEventListener("open", () => {
    console.log(`Client ${id} connected`);

    socket.send(JSON.stringify(getInfo()));
    intervalId = setInterval(() => {
      socket.send(JSON.stringify({
        datetime: getDateTimeUtc()
      }));
    }, 250);
  });
  socket.addEventListener("close", () => {
    console.log(`Client ${id} disconnected`);
    clearInterval(intervalId);
  });

  return response;
}
