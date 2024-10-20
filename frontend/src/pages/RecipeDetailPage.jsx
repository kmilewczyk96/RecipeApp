import {json, useLoaderData} from "react-router-dom";

import {getToken} from "../util/auth-token.js";


export default function RecipeDetailPage() {
  const recipe = useLoaderData();

  return (
    <p>{recipe.name}</p>
  );
};

export async function recipeDetailLoader({request, params}){
  const recipeID = params["recipeID"] + "/";
  const response = await fetch("http://localhost:8000/api/recipe/recipes/" + recipeID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + getToken()
    }
  });

  if (!response.ok) {
    throw json("Something went wrong!", {
      status: 404,
      statusText: "No such recipe!"
    });
  }

  return response.json();
}
