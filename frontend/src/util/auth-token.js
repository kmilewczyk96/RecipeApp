import {redirect} from "react-router-dom";

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  return token;
}

export function tokenLoader() {
  return getToken();
}

export function authLoader() {
  const token = getToken();
  if (token) {
    return redirect("/");
  }

  return null;
}