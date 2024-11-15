import style from "./RecipeDetailPageLayout.module.css";

import ManageRecipeMenu from "../UI/ManageRecipeMenu.jsx";
import RecipeDetailCard from "../UI/RecipeDetailCard.jsx";
import RecipeDetailIngredients from "../UI/RecipeDetailIngredients.jsx";


export default function RecipeDetailPageLayout({recipe}) {
  return (
    <div className={style["recipe-detail-layout"]}>
      <div className={style["recipe-detail-manager-wrapper"]}>
        {recipe.is_owner && <ManageRecipeMenu recipe={recipe}/>}
      </div>
      <div className={style["recipe-details"]}>
        <div>
          <RecipeDetailIngredients recipeIngredients={recipe.r_ingredients}/>
        </div>
        <div>
          <h2>{recipe.name}</h2>
          <RecipeDetailCard recipe={recipe}/>
        </div>
      </div>
    </div>
  )
};
