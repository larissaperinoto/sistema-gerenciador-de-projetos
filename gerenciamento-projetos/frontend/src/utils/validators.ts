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
