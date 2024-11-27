import style from "./RecipeGrid.module.css";

import RecipeCard from "./RecipeCard.jsx";


export default function RecipeGrid({recipes}) {
  return (
    <div className={style["recipe-grid"]}>
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
