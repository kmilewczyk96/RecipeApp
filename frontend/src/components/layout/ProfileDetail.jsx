import style from "./ProfileDetail.module.css";

import Button, {buttonTypeClasses} from "../UI/Button.jsx";
import RecipeForm from "../forms/RecipeForm.jsx";
import useModal from "../../hooks/useModal.jsx";


export default function ProfileDetail({user, isOwner=false}) {
  const {setModalChildren} = useModal();

  return (
    <div className={style["profile-detail"]}>
      <h2>{user.name}</h2>
      {isOwner && <Button typeClass={buttonTypeClasses.submit}
      onClick={() => setModalChildren(<RecipeForm/>)}>Create new recipe</Button>}
    </div>
  );
}
