import style from "./RecipeCard.module.css";

import {Link, useNavigate} from "react-router-dom";

import Button from "./Button.jsx";
import CutleryIcon from "../icons/CutleryIcon.jsx";
import EnergyIcon from "../icons/EnergyIcon.jsx";
import PinIcon from "../icons/PinIcon.jsx";
import FollowDiv from "./FollowDiv.jsx";
import PlantIcon from "../icons/PlantIcon.jsx";
import TimerIcon from "../icons/TimerIcon.jsx";

import UserIcon from "../icons/UserIcon.jsx";
import {convertToHoursString} from "../../util/converters.js";


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
          <UserIcon/>
          <p><Link to={`/users/${recipe.user.id}`}>{recipe.user.name}</Link></p>
        </div>
        <div className={style["recipe-info-line"]}>
          <PinIcon/>
          <p>{recipe.cuisine_display}</p>
        </div>
        <div className={style["recipe-info-line"]}>
          <CutleryIcon/>
          <p>{recipe.recipe_type_display}</p>
        </div>
        <div className={style["recipe-info-line"]}>
          <TimerIcon/>
          <p>{timeRequired}</p>
        </div>
        <div className={style["recipe-info-line"]}>
          <EnergyIcon/>
          <p>{recipe.kcal}kcal.</p>
        </div>
        <div className={style["recipe-info-line"]}>
          <PlantIcon/>
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
