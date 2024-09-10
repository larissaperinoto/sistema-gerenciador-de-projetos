export function isEmailValid(email: string | undefined): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return false;
  }

  return emailRegex.test(email);
}

export function isStrongPassword(password: string | undefined): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!password) {
    return false;
  }

  return passwordRegex.test(password);
}

export function isStartDateValid(date: string | undefined) {
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
  endDate: string | undefined,
  startDate: string | undefined
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
