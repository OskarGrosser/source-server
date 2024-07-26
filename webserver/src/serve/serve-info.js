export function serveInfo(request, skip) {
  const url = new URL(request.url);
  if (url.pathname !== "/info.json") {
    return skip();
  }

  const headers = new Headers({
    "Content-Type": "application/json; charset=UTF-8"
  });
  return new Response(JSON.stringify(getInfo()), { status: 200, headers });
}

export function getInfo() {
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
