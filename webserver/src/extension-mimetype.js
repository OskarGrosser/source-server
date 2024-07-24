const extAndType = [
  ["txt", "text/plain"],
  ["html", "text/html"],
  ["json", "application/json"]
];

export function getExtType(mimetype) {
  return extAndType.find(pair => pair[1] === mimetype)?.[0] ?? null;
}

export function getMimeType(exttype) {
  return extAndType.find(pair => pair[0] === exttype)?.[1] ?? null;
}
