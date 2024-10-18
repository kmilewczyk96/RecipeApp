import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {authLoader, tokenLoader} from "./util/auth-token.js";

import HomePage from "./pages/HomePage.jsx";
import LoginPage, {loginAction} from "./pages/LoginPage.jsx";
import {logoutAction} from "./pages/Logout.js";
import MyProfilePage, {myProfileLoader, myProfileRecipesLoader} from "./pages/MyProfilePage.jsx";
import {addRecipeAction} from "./pages/RecipesPage.jsx";
import RegisterPage, {registerAction} from "./pages/RegisterPage.jsx";
import RootPage from "./pages/RootPage.jsx";
import UserDetailPage, {userDetailLoader} from "./pages/UserDetailPage.jsx";


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
          {path: ":userID", element: <UserDetailPage/>, loader: userDetailLoader},
        ]
      },
      {
        path: "my-profile",
        id: "my-profile",
        loader: myProfileLoader,
        children: [
          {index: true, element: <MyProfilePage/>, loader: myProfileRecipesLoader}
        ]
      },
      {
        path: "recipes",
        action: addRecipeAction,
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
