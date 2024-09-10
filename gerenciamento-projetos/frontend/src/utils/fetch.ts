import { AuthService } from "../services/auth.service";

export enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
  DELETE = "DELETE",
}

export async function fetchData(
  url: string,
  method: HttpMethod,
  body?: Record<string, any>
) {
  const token = AuthService.getInstance().getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  if (res.status === 204) {
    return;
  }

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  const data = await res.json();

  if (res.status !== 200 && res.status !== 201) {
    throw new Error(data?.error);
  }

  return data;
}
