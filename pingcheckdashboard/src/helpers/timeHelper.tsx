export default function getCurrentTimeForGraph() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}
