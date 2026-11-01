# TP Rutas — Rutas públicas, privadas y protegidas por rol

Monorepo con **Backend** (Node + Express 5 + TypeScript + MongoDB/Mongoose + JWT en cookies `httpOnly`) y **Frontend** (React + Vite + TypeScript + React Router).

Implementa los tres tipos de ruta pedidos, **tanto en el backend como en el frontend**:

| Tipo | Frontend | Backend | Sin sesión | Rol USER | Rol ADMIN |
|------|----------|---------|-----------|----------|-----------|
| Pública | `/`, `/login` | `GET /api/v1/public` | ✅ | ✅ | ✅ |
| Privada | `/dashboard` | `GET /api/v1/private` | ❌ → `/login` (401) | ✅ | ✅ |
| Privada por rol | `/admin` | `GET /api/v1/admin` | ❌ → `/login` (401) | ❌ → `/unauthorized` (403) | ✅ |

## Estructura

```
backend/
  src/middlewares/auth.middleware.ts   # exige JWT valido (cookie accessToken, renueva con refreshToken)
  src/middlewares/role.middleware.ts   # requireRole(...roles): 403 si el rol no esta permitido
  src/routes/demo.routes.ts            # /public, /private, /admin
  src/routes/auth.routes.ts            # /auth/register, /auth/login, /auth/logout, /auth/me
  src/seed.ts                          # crea los usuarios de prueba
frontend/
  src/auth/AuthContext.tsx             # sesion global (consulta /auth/me al cargar)
  src/routes/PrivateRoute.tsx          # ruta privada: sin usuario -> /login
  src/routes/RoleRoute.tsx             # ruta por rol: sin usuario -> /login, rol incorrecto -> /unauthorized
  src/router.tsx                       # definicion del router (createBrowserRouter)
```

### Cómo funciona la protección

**Backend**: los middlewares se encadenan en la ruta.

```ts
router.get("/public", publicContent);
router.get("/private", authMiddleware, privateContent);
router.get("/admin", authMiddleware, requireRole("ADMIN"), adminContent);
```

**Frontend**: las rutas protegidas son *layout routes* que renderizan `<Outlet />` o redirigen con `<Navigate />`.

```tsx
{ Component: PrivateRoute, children: [{ path: "/dashboard", Component: Dashboard }] },
{ element: <RoleRoute allowedRoles={["ADMIN"]} />, children: [{ path: "/admin", Component: Admin }] },
```

La protección del frontend es solo de UX: la seguridad real la garantiza el backend, que responde 401/403 aunque se intente llamar a la API directamente.

## Cómo correrlo

Requisitos: Node 22+ y una base MongoDB (local o Atlas).

```bash
# Backend
cd backend
cp .env.example .env      # completar MONGODB_URI y los secretos JWT
npm install
npm run seed              # crea admin@demo.com y user@demo.com
npm run dev               # http://localhost:3000

# Frontend (otra terminal)
cd frontend
cp .env.example .env
npm install
npm run dev               # http://localhost:5173
```

MongoDB local rápido con Docker: `docker run -d --name mongo -p 27017:27017 mongo:7`

### Usuarios de prueba

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@demo.com | 123456 | ADMIN |
| user@demo.com | 123456 | USER |

## Prueba rápida con curl

```bash
curl -i localhost:3000/api/v1/public                    # 200
curl -i localhost:3000/api/v1/private                   # 401
curl -c c.txt -H 'Content-Type: application/json' \
  -d '{"email":"user@demo.com","password":"123456"}' localhost:3000/api/v1/auth/login
curl -i -b c.txt localhost:3000/api/v1/private          # 200
curl -i -b c.txt localhost:3000/api/v1/admin            # 403 (USER no es ADMIN)
```
