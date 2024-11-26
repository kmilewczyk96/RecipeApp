import style from "./RecipeTitleBar.module.css";

import HeartIcon from "../../icons/HeartIcon.jsx";
import IconButton from "../../icons/wrappers/IconButton.jsx";
import {EditRPath} from "../../icons/svg-paths/Regular.jsx";
import useModal from "../../../hooks/useModal.jsx";
import RecipeForm from "../../forms/recipe/RecipeForm.jsx";


export default function RecipeTitleBar({recipe}) {
  const {setModalChildren} = useModal();

  function handleEdit() {
    setModalChildren(<RecipeForm initialData={recipe}/>);
  }

  let options;
  if (recipe.is_owner) {
    options = (
      <>
        <IconButton
          size={"24"}
          hexColor={"#e6fcf5"}
          onClick={handleEdit}
        ><EditRPath/></IconButton>
      </>
    );
  } else {
    options = (
      <>
        <HeartIcon colorHex={"#e6fcf5"}/>
      </>
    );
  }

  return (
    <div className={style["recipe-title-bar"]}>
      <h2 className={style["recipe-title"]}>{recipe.name}</h2>
      <div className={style["recipe-options"]}>
        {options}
      </div>
    </div>
  );
};
