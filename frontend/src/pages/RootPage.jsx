import {Outlet, useLoaderData} from "react-router-dom";

import CreateRecipeForm from "../components/forms/CreateRecipeForm.jsx";
import MainNavigationBar from "../components/layout/MainNavigationBar.jsx";
import ModalContextProvider from "../store/ModalContext.jsx";


export default function RootPage() {
  return (
    <ModalContextProvider>
      <MainNavigationBar/>
      <main>
        <CreateRecipeForm/>
        <Outlet/>
      </main>
    </ModalContextProvider>
  );
}

export function authLoader() {

}