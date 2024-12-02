import style from "./layouts/UserDetailLayout.module.css";

import {json, useLoaderData, useRouteLoaderData, useSearchParams} from "react-router-dom";

import ProfileDetail from "/src/components/user/ProfileDetail.jsx";
import RecipeGrid from "/src/components/recipe/RecipeGrid.jsx";

import {getToken} from "/src/util/auth-token.js";
import queryClient, {fetchRecipes} from "/src/util/http.js";
import {useQuery} from "@tanstack/react-query";


export default function MyProfilePage() {
  const user = useRouteLoaderData('my-profile');
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["recipes", {userID: "me", name: name}],
    queryFn: ({signal}) => fetchRecipes({signal, userSuffix: "me", name})
  });


  return (
    <div className={style["user-detail-layout"]}>
      <ProfileDetail user={user} isOwner/>
      {(data && !isLoading) && (
        <RecipeGrid
          addRecipe={true}
          noRecipeMessage={"You don't have any recipes yet."}
          recipes={data}
        />
      )}
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

export async function myProfileRecipesLoader({request}){
  const userSuffix = "me";
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const name = params.get("name");

  return queryClient.fetchQuery({
    queryKey: ["recipes", {userID: "me", name: name}],
    queryFn: ({signal}) => fetchRecipes({signal, userSuffix, name}),
  })
}
