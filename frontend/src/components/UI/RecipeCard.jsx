import style from "./RecipeCard.module.css";

import {Link, useNavigate} from "react-router-dom";

import Button from "./Button.jsx";
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

  return (
    <article className={style["recipe-card"]}>
      <h2>{recipe.name}</h2>
      <div className={style["recipe-info"]}>
        <div className={style["recipe-info-line"]}>
          <UserIcon hexColor={"#0b7285"}/>
          <p><Link to={`/users/${recipe.user.id}`}>{recipe.user.name}</Link></p>
        </div>
        <div className={style["recipe-info-line"]}>
          <PinIcon hexColor={"#c92a2a"}/>
          <p>European</p>
        </div>
        <div className={style["recipe-info-line"]}>
          <TimerIcon/>
          <p>{timeRequired}</p>
        </div>
        <div className={style["recipe-info-line"]}>
          <PlantIcon hexColor={"#2b8a3e"}/>
          <p>Vegan</p>
        </div>
      </div>
      <div className={style["actions"]}>
        <Button
          onClick={clickHandler}
          className={style["recipe-button"] + " " + style["recipe-button--left"]}
        >Open
        </Button>
        <FollowDiv/>
      </div>
    </article>
  );
};
