import style from "./RecipeGrid.module.css";

import RecipeCard from "./RecipeCard.jsx";
import RecipeSearchBar from "./RecipeSearchBar.jsx";


export default function RecipeGrid({recipes, addRecipe=false}) {
  return (
    <div className={style["recipe-grid"]}>
      <RecipeSearchBar add={addRecipe}/>
      <ul className={style["recipes"]}>
      {
        recipes.map(recipe => {
          return (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe}/>
            </li>
          );
        })
      }
      </ul>
    </div>
  );
};
