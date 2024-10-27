import style from "./RecipeDetailPageLayout.module.css";

import RecipeDetailIngredients from "../UI/RecipeDetailIngredients.jsx";


export default function RecipeDetailPageLayout({recipe}) {
  return (
    <div className={style["recipe-detail-layout"]}>
      <RecipeDetailIngredients recipeIngredients={recipe.r_ingredients}/>
      <div>

      </div>
    </div>
  )
};
