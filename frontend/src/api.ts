// Wrapper de fetch: siempre manda las cookies httpOnly (credentials) y desarma el sobre { success, data | error }.
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  const body = await response.json().catch(() => null);

  if (!response.ok || !body?.success) {
    throw new ApiError(response.status, body?.error?.message ?? "Error de conexion con el servidor");
  }

  return body.data as T;
}
