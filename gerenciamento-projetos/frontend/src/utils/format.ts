export function formatDateToString(date: string | undefined) {
  if (date) {
    return new Date(date).toLocaleDateString();
  }
}
