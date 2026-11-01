// Ruta privada protegida por rol: ademas de estar autenticado, el usuario tiene que tener uno de los roles permitidos.
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext";
import type { UserRole } from "../types";

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="loading">Verificando sesion...</p>;

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
