import style from "./RecipeGrid.module.css";

import {useSearchParams} from "react-router-dom";

import RecipeCard from "./RecipeCard.jsx";
import RecipeSearchBar from "./RecipeSearchBar.jsx";


export default function RecipeGrid({recipes, noRecipeMessage, addRecipe = false}) {
  const [searchParams, _] = useSearchParams();
  if (searchParams.size > 0 && recipes.length === 0) {
    noRecipeMessage = "No recipes for this search parameters.";
  }

  return (
    <div className={style["recipe-grid"]}>
      <RecipeSearchBar add={addRecipe}/>
      {recipes.length > 0 ? (
        <ul className={style["recipes"]}>
          {recipes.map(recipe => {
            return (
              <li key={recipe.id}>
                <RecipeCard recipe={recipe}/>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={style["no-recipes"]}>{noRecipeMessage}</p>
      )}
    </div>
  );
};
