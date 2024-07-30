# Streaming Environment

A server for live sources for streaming.

## Browser Sources

1. Start server: `deno run --allow-net --allow-read -- .\webserver\src\main.js`
2. Add sources:
    * Add _Browser Source_ "Info Bar" with `http://localhost:8080/info-bar.html`.

## Configurables

* `webserver/resources/info.json`: Strings for `info-bar.html`.
