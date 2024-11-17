import style from "./layouts/MainLayout.module.css";

import {Navigate, Outlet, redirect, useLoaderData, useLocation, useNavigate} from "react-router-dom";

import RecipeForm from "../components/forms/RecipeForm.jsx";
import MainNavigationBar from "../components/layout/MainNavigationBar.jsx";
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
    return <Navigate to={"/my-profile"}/>
  }

  return (
    <ModalContextProvider>
      <MainNavigationBar/>
      <main className={style["main"]}>
        <RecipeMultiFormProvider>
          <RecipeForm/>
        </RecipeMultiFormProvider>
        <Outlet/>
      </main>
    </ModalContextProvider>
  );
}

export function authLoader() {
  return getToken();
}
