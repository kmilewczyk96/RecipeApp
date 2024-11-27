import style from "./RecipeDetailCard.module.css";

import {Link} from "react-router-dom";

import {convertToHoursString} from "/src/util/converters.js";
import {CutleryRPath, EnergyRPath, PinRPath, TimerRPath, UserRPath} from "../icons/svg-paths/Regular.jsx";
import IconStatic from "../icons/wrappers/IconStatic.jsx";


export default function RecipeDetailCard({recipe}) {
  const timeRequired = convertToHoursString(recipe.time_minutes);

  return (
    <div className={style["recipe-detail-card"]}>
      <h3>About</h3>
      <ul className={style["recipe-info"]}>
        <li className={style["recipe-info-line"]}>
          <IconStatic><UserRPath/></IconStatic>
          <p><Link to={`/users/${recipe.user.id}`}>{recipe.user.name}</Link></p>
        </li>
        <li className={style["recipe-info-line"]}>
          <IconStatic><PinRPath/></IconStatic>
          <p>{recipe.cuisine_display}</p>
        </li>
        <li className={style["recipe-info-line"]}>
          <IconStatic><CutleryRPath/></IconStatic>
          <p>{recipe.recipe_type_display}</p>
        </li>
        <li className={style["recipe-info-line"]}>
          <IconStatic><TimerRPath/></IconStatic>
          <p>{timeRequired}</p>
        </li>
        <li className={style["recipe-info-line"]}>
          <IconStatic><EnergyRPath/></IconStatic>
          <p>{recipe.kcal}kcal.</p>
        </li>
      </ul>
      <ul className={style["tags"]}>
        {recipe.tag_names.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <h3>Steps</h3>
      <ol className={style["steps"]}>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};
