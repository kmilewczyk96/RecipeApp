import style from "./RecipeDetailPageLayout.module.css";

import RecipeDetailCard from "../UI/RecipeDetailCard.jsx";
import RecipeDetailIngredients from "../UI/RecipeDetailIngredients.jsx";


export default function RecipeDetailPageLayout({recipe}) {
  return (
    <div className={style["recipe-detail-layout"]}>
      <div>
        <RecipeDetailIngredients recipeIngredients={recipe.r_ingredients}/>
      </div>
      <div>
        <h2>{recipe.name}</h2>
        <RecipeDetailCard recipe={recipe}/>
      </div>
    </div>
  )
};
