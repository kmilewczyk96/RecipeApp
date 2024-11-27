import style from "./layouts/UserDetailLayout.module.css";

import {json, useLoaderData, useRouteLoaderData} from "react-router-dom";

import ProfileDetail from "/src/components/user/ProfileDetail.jsx";
import RecipeGrid from "/src/components/recipe/RecipeGrid.jsx";

import {getToken} from "/src/util/auth-token.js";
import queryClient, {fetchRecipes} from "/src/util/http.js";


export default function MyProfilePage() {
  const user = useRouteLoaderData('my-profile');
  const recipes = useLoaderData();

  return (
    <div className={style["user-detail-layout"]}>
      <ProfileDetail user={user} isOwner/>
      <RecipeGrid addRecipe={true} recipes={recipes}/>
    </div>
  );
};

export async function myProfileLoader(){
  const response = await fetch("http://localhost:8000/api/user/me/", {
    method: "GET",
    headers: {
      "Authorization": "Token " + getToken()
    }
  });

  if (!response.ok) {
    throw json({message: "Something went wrong."}, {
      status: 404,
      statusText: "Bad request, check URL or login."
    });
  }

  return response.json();
}

export async function myProfileRecipesLoader(){
  const userSuffix = "me";

  return queryClient.fetchQuery({
    queryKey: ["recipes", {userID: "me"}],
    queryFn: ({signal}) => fetchRecipes({signal, userSuffix}),
  })
}
