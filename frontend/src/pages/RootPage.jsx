import style from "./layouts/MainLayout.module.css";

import {Navigate, Outlet, useLoaderData, useLocation} from "react-router-dom";

import RecipeForm from "../components/forms/RecipeForm.jsx";
import MainNavigationBar from "../components/layout/MainNavigationBar.jsx";
import Modal from "../components/UI/Modal.jsx";
import ModalContextProvider from "../store/ModalContext.jsx";
import RecipeMultiFormProvider from "../store/RecipeMultiFormContext.jsx";
import {getToken} from "../util/auth-token.js";


export default function RootPage() {
  const token = useLoaderData()
  const location = useLocation().pathname;

  if (!token && !location.startsWith("/auth")) {
    return <Navigate to={"/auth/login"}/>;
  }

  if (token && location.startsWith("/auth")) {
    return <Navigate to={"/my-profile"}/>;
  }

  return (
    <ModalContextProvider>
      <MainNavigationBar/>
      <main className={style["main-layout"]}>
        <RecipeMultiFormProvider>
          <Modal/>
        </RecipeMultiFormProvider>
        <Outlet/>
      </main>
    </ModalContextProvider>
  );
}

export function authLoader() {
  return getToken();
}

export function strictLoader(loader) {
  return async (...args) => {
    const token = getToken();
    if (token) {
      return loader(...args);
    }
    return null;
  }
}
