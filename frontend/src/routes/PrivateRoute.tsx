// Ruta privada: solo usuarios autenticados. Si no hay sesion, redirige a /login recordando a donde queria ir.
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="loading">Verificando sesion...</p>;

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return <Outlet />;
}
