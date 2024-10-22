import style from "./FollowDiv.module.css";

import HeartIcon from "../icons/HeartIcon.jsx";


export default function FollowDiv() {
  return (
    <div className={style["follow-div"]}>
      <HeartIcon size="36" colorHex="#adb5bd"/>
      <span>12.5k</span>
    </div>
  );
};
