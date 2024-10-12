import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {authLoader, tokenLoader} from "./util/auth-token.js";

import HomePage from "./pages/HomePage.jsx";
import LoginPage, {loginAction} from "./pages/LoginPage.jsx";
import {logoutAction} from "./pages/Logout.js";
import RegisterPage, {registerAction} from "./pages/RegisterPage.jsx";
import RootPage from "./pages/RootPage.jsx";
import UserProfilePage, {userProfileLoader} from "./pages/UserProfilePage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootPage/>,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "/logout",
        action: logoutAction
      },
      {
        path: "auth",
        loader: authLoader,
        children: [
          {path: "register", element: <RegisterPage/>, action: registerAction},
          {path: "login", element: <LoginPage/>, action: loginAction}
        ]
      },
      {
        path: "users",
        children: [
          {path: ":userID", element: <UserProfilePage/>, loader: userProfileLoader},
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App
