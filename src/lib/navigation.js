import { routes } from "../lib/routes";

export const createNavArray = (menu = "main", vars = {}) => {
  const nav_array = [];

  const resolve_path = (path) => {
    return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      return vars[key] ?? `:${key}`;
    });
  };

  const walk_routes = (route_list, parent_path = "") => {
    route_list.forEach((route) => {
      const path =
        route.path === "/"
          ? parent_path || "/"
          : `${parent_path}/${route.path}`.replace(/\/+/g, "/");

      if (route.menu === menu) {
        nav_array.push({
          text: route.text,
          link: resolve_path(path),
          icon: route.icon,
          when: route.when,
        });
      }

      if (route.children) {
        walk_routes(route.children, path);
      }
    });
  };

  walk_routes(routes);

  return nav_array;
};
