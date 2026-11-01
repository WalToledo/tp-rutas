import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <nav>
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>

      <div className="session">
        {user ? (
          <>
            <span>
              {user.name} <span className={`badge badge-${user.role.toLowerCase()}`}>{user.role}</span>
            </span>
            <button onClick={handleLogout}>Cerrar sesion</button>
          </>
        ) : (
          <NavLink to="/login">Iniciar sesion</NavLink>
        )}
      </div>
    </header>
  );
}
