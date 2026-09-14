/* @refresh reload */
import "bulma/css/bulma.min.css";
import "./index.css";
import { render } from "solid-js/web";
import "solid-devtools";

import { Router } from "@solidjs/router";
import { routes } from "./lib/routes";

import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <AuthProvider>
      <Router root={MainLayout}>{routes}</Router>
    </AuthProvider>
  ),
  root,
);
