import style from "./ProfileDetail.module.css";

import {useContext} from "react";

import Button from "../UI/Button.jsx";
import {ModalContext} from "../../store/ModalContext.jsx";


export default function ProfileDetail({user, isOwner=false}) {
  const {showCreateRecipeForm} = useContext(ModalContext);

  return (
    <div className={style["profile-detail"]}>
      <h2>{user.name}</h2>
      {isOwner && <Button cta onClick={showCreateRecipeForm}>Create new recipe</Button>}
    </div>
  );
}
