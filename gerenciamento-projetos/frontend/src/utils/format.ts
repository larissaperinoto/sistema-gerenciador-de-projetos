export function formatDateToString(date: string | undefined) {
  if (date) {
    return new Date(date).toLocaleDateString();
  }
}

export function formatDateToISO(date: string | undefined) {
  if (date) {
    return new Date(date).toISOString().split("T")[0];
  }
}
