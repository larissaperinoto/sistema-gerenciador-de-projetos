export function isStartDateValid(date: Date | undefined) {
  if (!date) {
    return false;
  }

  const nowTimestamp = new Date().getTime();
  const dateTimestamp = new Date(date).getTime();

  if (dateTimestamp >= nowTimestamp) {
    return true;
  } else {
    return false;
  }
}

export function isEndDateValid(
  endDate: Date | undefined,
  startDate: Date | undefined
) {
  if (!endDate || !startDate) {
    return false;
  }

  const startDateTimestamp = new Date(startDate).getTime();
  const endDateTimestamp = new Date(endDate).getTime();

  if (endDateTimestamp >= startDateTimestamp) {
    return true;
  } else {
    return false;
  }
}
