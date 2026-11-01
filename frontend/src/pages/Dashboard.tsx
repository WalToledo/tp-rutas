import { useAuth } from "../auth/AuthContext";
import ApiMessage from "../components/ApiMessage";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Ruta <strong>privada</strong>: solo usuarios autenticados. Hola, {user?.name} ({user?.email}).</p>
      <ApiMessage path="/private" />
    </section>
  );
}
