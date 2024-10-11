import {Outlet, useLoaderData} from "react-router-dom";

import MainNavigationBar from "../components/layout/MainNavigationBar.jsx";


export default function RootPage() {
  return (
    <>
      <MainNavigationBar/>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export function authLoader() {

}