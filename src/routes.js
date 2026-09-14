import { children, lazy } from "solid-js";
import AppLayout from "./layouts/AppLayout.jsx";
import { ProtectedRoute } from "./context/AuthContext.jsx";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("./routes/Home.jsx")),
    text: "Home",
  },
  {
    path: "/auth",
    children: [
      {
        path: "/sign-in",
        component: lazy(() => import("./routes/Login.jsx")),
        text: "Sign in",
      },
      {
        path: "/sign-up",
        component: lazy(() => import("./routes/Register.jsx")),
        text: "Sign up",
      },
      {
        path: "/logout",
        component: lazy(() => import("./routes/Logout.jsx")),
        text: "Log out",
      },
    ],
  },
  {
    path: "/profile",
    component: AppLayout,
    children: [
      {
        path: "/:user_id",
        component: lazy(() => import("./routes/Profile.jsx")),
        text: "Profile",
      },
      {
        path: "/:user_id/edit",
        component: lazy(() => import("./routes/EditProfile.jsx")),
        text: "Edit",
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
            path: "/explore",
            component: lazy(() => import("./routes/Explore.jsx")),
            text: "Explore",
          },
          {
            path: "/settings",
            component: lazy(() => import("./routes/Settings.jsx")),
            text: "Settings",
          },
          {
            path: "/read/:book_id",
            component: lazy(() => import("./routes/Read.jsx")),
            text: "Read",
          },
          {
            path: "/write",
            component: lazy(() => import("./routes/Write.jsx")),
            text: "Write",
          },
          {
            path: "/write/:book_id",
            component: lazy(() => import("./routes/Write.jsx")),
            text: "Continue writing",
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
