import style from "./RecipeTitleBar.module.css";

import IconButton from "../icons/wrappers/IconButton.jsx";
import {EditRPath, TrashRPath} from "../icons/svg-paths/Regular.jsx";
import useModal from "/src/hooks/useModal.jsx";
import RecipeForm from "../forms/recipe/RecipeForm.jsx";
import ModalConfirmation from "../UI/modal/ModalConfirmation.jsx";
import {deleteRecipe} from "/src/util/http.js";


export default function RecipeTitleBar({recipe}) {
  const {setModalChildren} = useModal();

  function handleEdit() {
    setModalChildren(<RecipeForm initialData={recipe}/>);
  }

  function handleDelete() {
    setModalChildren(
      <ModalConfirmation
        title={"Are you sure?"}
        text={`You are about to delete ${recipe.name}. This operation can not be undone!`}
        onSubmitFn={() => deleteRecipe(recipe.id)}
      />
    )
  }

  let options;
  if (recipe.is_owner) {
    options = (
      <>
        <IconButton
          size={"20"}
          hexColor={"#e6fcf5"}
          onClick={handleEdit}
        ><EditRPath/></IconButton>
        <IconButton
          size={"20"}
          hexColor={"#e6fcf5"}
          onClick={handleDelete}
        ><TrashRPath/></IconButton>
      </>
    );
  } else {
    options = (
      <>
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
