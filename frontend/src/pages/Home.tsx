import ApiMessage from "../components/ApiMessage";

export default function Home() {
  return (
    <section>
      <h1>Inicio</h1>
      <p>Ruta <strong>publica</strong>: accesible para cualquier usuario, sin necesidad de autenticacion.</p>
      <ul className="route-list">
        <li><strong>/</strong> y <strong>/login</strong>: publicas</li>
        <li><strong>/dashboard</strong>: privada (usuario autenticado)</li>
        <li><strong>/admin</strong>: privada protegida por rol (ADMIN)</li>
      </ul>
      <ApiMessage path="/public" />
    </section>
  );
}
