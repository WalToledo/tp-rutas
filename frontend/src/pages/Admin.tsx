import ApiMessage from "../components/ApiMessage";

export default function Admin() {
  return (
    <section>
      <h1>Panel de administracion</h1>
      <p>Ruta <strong>privada protegida por rol</strong>: solo usuarios autenticados con rol ADMIN.</p>
      <ApiMessage path="/admin" />
    </section>
  );
}
