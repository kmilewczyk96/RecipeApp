import style from "./RecipeDetailCard.module.css";

import UserIcon from "../icons/UserIcon.jsx";

import {convertToHoursString} from "../../util/converters.js";
import {Link} from "react-router-dom";
import PinIcon from "../icons/PinIcon.jsx";
import TimerIcon from "../icons/TimerIcon.jsx";
import EnergyIcon from "../icons/EnergyIcon.jsx";
import PlantIcon from "../icons/PlantIcon.jsx";


export default function RecipeDetailCard({recipe}) {
  const timeRequired = convertToHoursString(recipe.time_minutes);

  return (
    <div className={style["recipe-detail-card"]}>
      <h3>About</h3>
      <ul className={style["recipe-info"]}>
        <li className={style["recipe-info-line"]}>
          <UserIcon/>
          <p><Link to={`/users/${recipe.user.id}`}>{recipe.user.name}</Link></p>
        </li>
        <li className={style["recipe-info-line"]}>
          <PinIcon/>
          <p>European</p>
        </li>
        <li className={style["recipe-info-line"]}>
          <TimerIcon/>
          <p>{timeRequired}</p>
        </li>
        <li className={style["recipe-info-line"]}>
          <EnergyIcon/>
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
        <li>TBC</li>
      </ol>
    </div>
  );
};
