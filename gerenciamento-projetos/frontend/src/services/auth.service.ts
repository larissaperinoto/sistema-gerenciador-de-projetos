export async function login(credentials: { email: string; password: string }) {
  const serverPath = process.env.REACT_APP_SERVER_URL as string;
  const loginPath = process.env.REACT_APP_LOGIN_PATH as string;

  const res = await fetch(serverPath + loginPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.error);
  }
}
