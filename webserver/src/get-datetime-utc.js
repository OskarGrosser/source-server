export default function getDateTimeUtc() {
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
}
