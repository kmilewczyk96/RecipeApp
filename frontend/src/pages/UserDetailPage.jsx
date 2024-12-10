import {json, useLoaderData, useSearchParams} from "react-router-dom";

import {getToken} from "/src/util/auth-token.js";
import style from "./layouts/UserDetailLayout.module.css";
import ProfileDetail from "../components/user/ProfileDetail.jsx";
import RecipeGrid from "../components/recipe/RecipeGrid.jsx";
import {useQuery} from "@tanstack/react-query";
import {fetchRecipes} from "../util/http.js";


export default function UserDetailPage() {
  const user = useLoaderData();
  console.log(user)
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["recipes", {userID: user.id, name: name}],
    queryFn: ({signal}) => fetchRecipes({signal, userSuffix: user.id, name})
  });

  return (
    <div className={style["user-detail-layout"]}>
      <ProfileDetail user={user}/>
      {(data && !isLoading) && (
        <RecipeGrid
          addRecipe={false}
          noRecipeMessage={"This user doesn't have any recipes yet."}
          recipes={data}
        />
      )}
    </div>
  );
};

export async function userDetailLoader({request, params}) {
  const userID = params["userID"] + "/";
  const response = await fetch("http://localhost:8000/api/user/users/" + userID, {
    method: "GET",
    headers: {
      "Authorization": "Token " + getToken()
    }
  });

  if (!response.ok) {
    throw json({message: "Something went wrong."}, {
      status: 404,
      statusText: "User does not exist."
    });
  }

  return response.json();
}
