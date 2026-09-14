import { createComponent, lazy } from "solid-js";
import AppLayout from "./layouts/AppLayout.jsx";
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
    component: ProtectedRoute,
    children: [
      {
        path: "/",
        component: AppLayout,
        children: [
          {
            path: "/profile",
            component: lazy(() => import("./routes/Profile.jsx")),
          },
          {
            path: "/explore",
            component: lazy(() => import("./routes/Explore.jsx")),
          },
          {
            path: "/read/:book_id",
            component: lazy(() => import("./routes/Read.jsx")),
          },
          {
            path: "/write",
            component: lazy(() => import("./routes/Write.jsx")),
          },
          {
            path: "/write/:book_id",
            component: lazy(() => import("./routes/Write.jsx")),
          },
        ],
      },
    ],
  },
  {
    path: "*404",
    component: lazy(() => import("./routes/NotFound.jsx")),
  },
];
