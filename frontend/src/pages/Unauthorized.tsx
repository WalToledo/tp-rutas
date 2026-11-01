import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <section>
      <h1>403 - Acceso denegado</h1>
      <p>Tu usuario no tiene el rol necesario para ver esta pagina.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}
