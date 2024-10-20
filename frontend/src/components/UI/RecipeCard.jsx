import style from "./RecipeCard.module.css";

import {useNavigate} from "react-router-dom";

import Button from "./Button.jsx";

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
        <p className={style["cuisine"]}>Cuisine: European</p>
        <p>Estimated time: {timeRequired}</p>
        <ul className={style["tags"]}>
          <li><p>TODO: is vegan.</p></li>
          <li><p>TODO: is vegetarian.</p></li>
          <li><p>TODO: is gluten free.</p></li>
          <li><p>TODO: nuts free</p></li>
          <li><p>TODO: seafood free</p></li>
        </ul>
        <p>TODO: appliances required</p>
      </div>
      <div className={style["actions"]}>
        <Button onClick={clickHandler} className={style["recipe-button"]}>Open</Button>
        <p className={style["subscriber-info"]}>Heart</p>
      </div>
    </article>
  );
};
