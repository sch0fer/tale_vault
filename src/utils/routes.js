import { children, lazy } from "solid-js";
import AppLayout from "../layouts/AppLayout.jsx";
import { ProtectedRoute } from "../context/AuthContext.jsx";
import {
  House,
  LogIn,
  UserPlus,
  LogOut,
  User,
  UserPen,
  Search,
  Cog,
  Pen,
} from "lucide-solid";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("../routes/Home.jsx")),
    text: "Home",
    icon: <House />,
    menu: "main",
  },
  {
    path: "/auth",
    children: [
      {
        path: "/sign-in",
        component: lazy(() => import("../routes/Login.jsx")),
        text: "Sign in",
        icon: <LogIn />,
        menu: "main",
      },
      {
        path: "/sign-up",
        component: lazy(() => import("../routes/Register.jsx")),
        text: "Sign up",
        icon: <UserPlus />,
        menu: "main",
      },
      {
        path: "/logout",
        component: lazy(() => import("../routes/Logout.jsx")),
        text: "Log out",
        icon: <LogOut />,
        menu: "main",
      },
    ],
  },
  {
    path: "/profile",
    component: AppLayout,
    children: [
      {
        path: "/:user_id",
        component: lazy(() => import("../routes/Profile.jsx")),
        text: "Profile",
        icon: <User />,
        menu: "main",
      },
      {
        path: "/:user_id/edit",
        component: lazy(() => import("../routes/EditProfile.jsx")),
        text: "Edit profile",
        icon: <UserPen />,
        menu: "app",
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
            component: lazy(() => import("../routes/Explore.jsx")),
            text: "Explore",
            icon: <Search />,
            menu: "app",
          },
          {
            path: "/settings",
            component: lazy(() => import("../routes/Settings.jsx")),
            text: "Settings",
            icon: <Cog />,
            menu: "app",
          },
          {
            path: "/read/:book_id",
            component: lazy(() => import("../routes/Read.jsx")),
          },
          {
            path: "/write",
            component: lazy(() => import("../routes/Write.jsx")),
            text: "Write",
            icon: <Pen />,
            menu: "app",
          },
          {
            path: "/write/:book_id",
            component: lazy(() => import("../routes/WriteBook.jsx")),
          },
        ],
      },
    ],
  },
  {
    path: "*404",
    component: lazy(() => import("../routes/NotFound.jsx")),
  },
];
