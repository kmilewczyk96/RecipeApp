import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {QueryClientProvider} from "@tanstack/react-query";

import HomePage from "./pages/HomePage.jsx";
import LoginPage, {loginAction} from "./pages/LoginPage.jsx";
import {logoutAction} from "./pages/Logout.js";
import MyProfilePage, {myProfileLoader, myProfileRecipesLoader} from "./pages/MyProfilePage.jsx";
import RecipeDetailPage, {recipeDetailLoader} from "./pages/RecipeDetailPage.jsx";
import queryClient from "./util/http.js";
import RegisterPage, {registerAction} from "./pages/RegisterPage.jsx";
import RootPage, {authLoader, strictLoader} from "./pages/RootPage.jsx";
import UserDetailPage, {userDetailLoader} from "./pages/UserDetailPage.jsx";
import RecipesPage, {recipesLoader} from "./pages/RecipesPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: authLoader,
    element: <RootPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: "/logout",
        action: logoutAction
      },
      {
        path: "auth",
        children: [
          {path: "register", element: <RegisterPage/>, action: registerAction},
          {path: "login", element: <LoginPage/>, action: loginAction}
        ]
      },
      {
        path: "users",
        children: [
          {path: ":userID", element: <UserDetailPage/>, loader: strictLoader(userDetailLoader)},
        ]
      },
      {
        path: "my-profile",
        id: "my-profile",
        loader: strictLoader(myProfileLoader),
        children: [
          {index: true, element: <MyProfilePage/>, loader: strictLoader(myProfileRecipesLoader)}
        ]
      },
      {
        path: "recipes",
        children: [
          {index: true, element: <RecipesPage/>, loader: strictLoader(recipesLoader)},
          {path: ":recipeID", element: <RecipeDetailPage/>, loader: strictLoader(recipeDetailLoader)},
        ]
      }
    ]
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  );
}

export default App;
