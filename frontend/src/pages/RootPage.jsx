import {Outlet, useLoaderData} from "react-router-dom";

import RecipeForm from "../components/forms/RecipeForm.jsx";
import MainNavigationBar from "../components/layout/MainNavigationBar.jsx";
import ModalContextProvider from "../store/ModalContext.jsx";
import RecipeMultiFormProvider from "../store/RecipeMultiFormContext.jsx";


export default function RootPage() {
  return (
    <ModalContextProvider>
      <MainNavigationBar/>
      <main>
        <RecipeMultiFormProvider>
          <RecipeForm/>
        </RecipeMultiFormProvider>
        <Outlet/>
      </main>
    </ModalContextProvider>
  );
}

export function authLoader() {

}