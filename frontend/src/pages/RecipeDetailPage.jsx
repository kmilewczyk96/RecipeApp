import style from "./layouts/RecipeDetailLayout.module.css";

import {json, useLoaderData} from "react-router-dom";

import RecipeDetailCard from "/src/components/recipe/RecipeDetailCard.jsx";
import RecipeDetailIngredients from "/src/components/recipe/RecipeDetailIngredients.jsx";
import {getToken} from "/src/util/auth-token.js";
import RecipeTitleBar from "/src/components/recipe/RecipeTitleBar.jsx";


export default function RecipeDetailPage() {
  const recipe = useLoaderData();

  return (
    <div className={style["recipe-detail-layout"]}>

      <div className={style["recipe-details"]}>
        <div>
          <RecipeDetailIngredients recipeIngredients={recipe.r_ingredients}/>
        </div>
        <div>
          <RecipeTitleBar recipe={recipe}/>
          <RecipeDetailCard recipe={recipe}/>
        </div>
      </div>
    </div>
  );
};

export async function recipeDetailLoader({request, params}) {
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
