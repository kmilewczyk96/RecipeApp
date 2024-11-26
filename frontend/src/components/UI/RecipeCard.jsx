import style from "./RecipeCard.module.css";

import {Link, useNavigate} from "react-router-dom";

import Button from "./Button.jsx";
import FollowDiv from "./FollowDiv.jsx";

import {convertToHoursString} from "../../util/converters.js";
import {CutleryRPath, EnergyRPath, PinRPath, PlantRPath, TimerRPath, UserRPath} from "../icons/svg-paths/Regular.jsx";
import IconStatic from "../icons/wrappers/IconStatic.jsx";


export default function RecipeCard({recipe}) {
  const navi = useNavigate();
  const timeRequired = convertToHoursString(recipe.time_minutes);
  function clickHandler() {
    navi(`/recipes/${recipe.id}`);
  }
  let veganTag = '';
  if (recipe.tag_names.includes('vegan')) {
    veganTag = 'vegan';
  } else if (recipe.tag_names.includes('vegetarian')) {
    veganTag = 'vegetarian';
  } else {
    veganTag = 'non-vegetarian';
  }

  return (
    <article className={style["recipe-card"]}>
      <h2>{recipe.name}</h2>
      <div className={style["recipe-info"]}>
        <div className={style["recipe-info-line"]}>
          <IconStatic><UserRPath/></IconStatic>
          <p><Link to={`/users/${recipe.user.id}`}>{recipe.user.name}</Link></p>
        </div>
        <div className={style["recipe-info-line"]}>
          <IconStatic><PinRPath/></IconStatic>
          <p>{recipe.cuisine_display}</p>
        </div>
        <div className={style["recipe-info-line"]}>
          <IconStatic><CutleryRPath/></IconStatic>
          <p>{recipe.recipe_type_display}</p>
        </div>
        <div className={style["recipe-info-line"]}>
          <IconStatic><TimerRPath/></IconStatic>
          <p>{timeRequired}</p>
        </div>
        <div className={style["recipe-info-line"]}>
          <IconStatic><EnergyRPath/></IconStatic>
          <p>{recipe.kcal}kcal.</p>
        </div>
        <div className={style["recipe-info-line"]}>
          <IconStatic><PlantRPath/></IconStatic>
          <p>{veganTag}</p>
        </div>
      </div>
      <div className={style["actions"]}>
        <Button
          onClick={clickHandler}
          className={style["recipe-button"]}
        >Open
        </Button>
        <FollowDiv/>
      </div>
    </article>
  );
};
