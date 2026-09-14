import { routes } from "../lib/routes";

export const createNavArray = (menu = "main", params = {}) => {
  const resolvePath = (path) => {
    return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      return params[key] ?? `:${key}`;
    });
  };
  const navArray = [];
  const walkRoutes = (routes, parentPath = "") => {
    routes.forEach((route) => {
      const path =
        route.path === "/"
          ? parentPath
          : `${parentPath}/${route.path}`.replace(/\/+/g, "/");

      if (route.menu === menu) {
        navArray.push({
          text: route.text,
          link: resolvePath(path),
          icon: route.icon,
          when: route.when,
        });
      }
      if (route.children) {
        walkRoutes(route.children, path);
      }
    });
  };
  walkRoutes(routes);
  return navArray;
};
