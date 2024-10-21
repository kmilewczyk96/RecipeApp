import style from "./RecipeCard.module.css";

import {Link, useNavigate} from "react-router-dom";

import Button from "./Button.jsx";
import FollowDiv from "./FollowDiv.jsx";

import {convertToHoursString} from "../../util/converters.js";


export default function RecipeCard({recipe}) {
  const navi = useNavigate();
  const timeRequired = convertToHoursString(recipe.time_minutes);
  function clickHandler() {
    navi(`/recipes/${recipe.id}`);
  }

  return (
    <article className={style["recipe-card"]}>
      <div className={style["recipe-info"]}>
        <h2>{recipe.name}</h2>
        <p>By: <Link to={`/users/${recipe.user.id}`}>{recipe.user.name}</Link>.</p>
        <p className={style["cuisine"]}>Cuisine: European</p>
        <p>Estimated time: {timeRequired}</p>
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
