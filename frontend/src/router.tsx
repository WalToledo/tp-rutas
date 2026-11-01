// Router de la app. Las rutas protegidas son layout routes: PrivateRoute / RoleRoute deciden si renderizan el <Outlet />.
import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      // Rutas publicas
      { path: "/", Component: Home },
      { path: "/login", Component: Login },
      { path: "/unauthorized", Component: Unauthorized },

      // Ruta privada: requiere sesion
      {
        Component: PrivateRoute,
        children: [{ path: "/dashboard", Component: Dashboard }],
      },

      // Ruta privada protegida por rol: requiere sesion + rol ADMIN
      {
        element: <RoleRoute allowedRoles={["ADMIN"]} />,
        children: [{ path: "/admin", Component: Admin }],
      },

      { path: "*", Component: NotFound },
    ],
  },
]);
