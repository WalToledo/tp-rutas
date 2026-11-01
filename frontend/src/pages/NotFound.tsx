import { Link } from "react-router";

export default function NotFound() {
  return (
    <section>
      <h1>404 - Pagina no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}
