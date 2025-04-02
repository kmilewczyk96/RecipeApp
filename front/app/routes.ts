import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "routes/auth/Login.tsx"),
  route("/register", "routes/auth/Register.tsx")
] satisfies RouteConfig;
