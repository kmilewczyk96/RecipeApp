import style from "./RecipeDetailIngredients.module.css";

import {convertToAltUnits} from "/src/util/converters.js";


export default function RecipeDetailIngredients({recipeIngredients}) {
  return (
    <div className={style["recipe-detail-ingredients"]}>
      <h3>Ingredients</h3>
      <ul>
        {recipeIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            <div className={style["ingredient-details"]}>
              <p>{ingredient.ingredient.name}</p>
              <p>{ingredient.quantity} {ingredient.ingredient.unit}</p>
            </div>
            <div className={style["ingredient-details"]}>
              <span>{ingredient.ingredient.alt_unit ? (
                `~${convertToAltUnits(ingredient.quantity, ingredient.ingredient.alt_to_unit_conversion)}${ingredient.ingredient.alt_unit}`
              ): (
                "n/a"
              )}
              </span>
              <span>{ingredient.kcal} kcal</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
