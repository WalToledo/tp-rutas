// Pide un endpoint del backend y muestra su mensaje: sirve para ver que la proteccion tambien existe del lado del servidor.
import { useEffect, useState } from "react";
import { api } from "../api";

export default function ApiMessage({ path }: { path: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ message: string }>(path)
      .then((data) => setMessage(data.message))
      .catch((err: Error) => setError(err.message));
  }, [path]);

  return (
    <div className="api-box">
      <code>GET /api/v1{path}</code>
      {error ? <p className="error">{error}</p> : <p>{message ?? "Cargando..."}</p>}
    </div>
  );
}
