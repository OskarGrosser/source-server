import getInfo from "../get-info.js";

export default function serveInfo(request, skip) {
  const url = new URL(request.url);
  if (url.pathname !== "/info.json") {
    return skip();
  }

  const headers = new Headers({
    "Content-Type": "application/json; charset=UTF-8"
  });
  return new Response(JSON.stringify(getInfo()), { status: 200, headers });
}
