import {json, useLoaderData, useRouteLoaderData} from "react-router-dom";

import ProfileDetail from "../components/layout/ProfileDetail.jsx";
import ProfilePageLayout from "../components/layout/ProfilePageLayout.jsx";
import RecipeGrid from "../components/layout/RecipeGrid.jsx";

import {getToken} from "../util/auth-token.js";
import queryClient, {fetchRecipes} from "../util/http.js";


export default function MyProfilePage() {
  const user = useRouteLoaderData('my-profile');
  const recipes = useLoaderData();

  return (
    <ProfilePageLayout>
      <ProfileDetail user={user} isOwner/>
      <RecipeGrid recipes={recipes}/>
    </ProfilePageLayout>
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
