# Streaming Environment

A server for browser sources to be used with streaming software (e.g. OBS, Streamlabs).

The server supports basic file serving. More handlers (i.e. middleware)
can be added to the `handlers` array in `src/main.js`.

## Browser Sources

1. Start server: `deno run --allow-net --allow-read -- .\webserver\src\main.js`
2. Add sources:
    * Add _Browser Source_ "Info Bar" with `http://localhost:8080/info-bar.html`:
      The document establishes a WebSocket connection to receive live updates.

## Configurables

* `webserver/resources/info.json`: Strings for `info-bar.html`.
