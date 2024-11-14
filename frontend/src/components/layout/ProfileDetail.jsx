import style from "./ProfileDetail.module.css";

import {useContext} from "react";

import Button, {buttonTypeClasses} from "../UI/Button.jsx";
import {ModalContext} from "../../store/ModalContext.jsx";


export default function ProfileDetail({user, isOwner=false}) {
  const {showRecipeForm} = useContext(ModalContext);

  return (
    <div className={style["profile-detail"]}>
      <h2>{user.name}</h2>
      {isOwner && <Button typeClass={buttonTypeClasses.submit} onClick={showRecipeForm}>Create new recipe</Button>}
    </div>
  );
}
