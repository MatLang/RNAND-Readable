export function timestampToDate(timestamp) {
  const time = new Date(timestamp)
  return time.toLocaleString();
}
