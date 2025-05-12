export function formatDate(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
