import { createComponent, lazy } from "solid-js";
import { ProtectedRoute } from "./context/AuthContext.jsx";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("./routes/Home.jsx")),
  },
  {
    path: "/auth",
    children: [
      {
        path: "/sign-in",
        component: lazy(() => import("./routes/Login.jsx")),
      },
      {
        path: "/sign-up",
        component: lazy(() => import("./routes/Register.jsx")),
      },
    ],
  },
  {
    path: "/app",
    component: (props) => createComponent(ProtectedRoute, props),
    children: [
      {
        path: "/profile",
        component: lazy(() => import("./routes/Profile.jsx")),
      },
    ],
  },
  {
    path: "*404",
    component: lazy(() => import("./routes/NotFound.jsx")),
  },
];
