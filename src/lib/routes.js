import { lazy } from "solid-js";
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
  Pen,
} from "lucide-solid";
import Home from "../routes/Home.jsx";
import Profile from "../routes/Profile.jsx";
import EditProfile from "../routes/EditProfile.jsx";
import Explore from "../routes/Explore.jsx";
import Settings from "../routes/Settings.jsx";
import Read from "../routes/Read.jsx";
import Write from "../routes/Write.jsx";
import WriteBook from "../routes/WriteBook.jsx";
import WriteChapter from "../routes/WriteChapter.jsx";

export const routes = [
  {
    path: "/",
    component: Home,
    text: "Home",
    icon: House,
    menu: "main",
  },
  {
    path: "/profile",
    component: AppLayout,
    children: [
      {
        path: "/:user_id",
        component: Profile,
        text: "Profile",
        icon: User,
        menu: "main",
        when: "userAuth",
      },
      {
        path: "/:user_id/edit",
        component: EditProfile,
        text: "Edit profile",
        icon: UserPen,
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
            component: Explore,
            text: "Explore",
            icon: Search,
            menu: "app",
          },
          {
            path: "/settings",
            component: Settings,
            text: "Settings",
            icon: Settings,
            menu: "app",
          },
          {
            path: "/read/:book_id",
            component: Read,
          },
          {
            path: "/write",
            component: Write,
            text: "Write",
            icon: Pen,
            menu: "app",
          },
          {
            path: "/write/:book_id",
            component: WriteBook,
          },
          {
            path: "/write/:book_id/:chapter_id",
            component: WriteChapter,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "/sign-in",
        component: lazy(() => import("../routes/Login.jsx")),
        text: "Sign in",
        icon: LogIn,
        menu: "main",
        when: "userNoAuth",
      },
      {
        path: "/sign-up",
        component: lazy(() => import("../routes/Register.jsx")),
        text: "Sign up",
        icon: UserPlus,
        menu: "main",
        when: "userNoAuth",
      },
      {
        path: "/logout",
        component: lazy(() => import("../routes/Logout.jsx")),
        text: "Log out",
        icon: LogOut,
        menu: "main",
        when: "userAuth",
      },
    ],
  },
  {
    path: "*404",
    component: lazy(() => import("../routes/NotFound.jsx")),
  },
];
