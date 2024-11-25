import style from "./ManageRecipeMenu.module.css";

import {useMutation} from "@tanstack/react-query";

import Button, {buttonSizeClasses, buttonTypeClasses} from "./Button.jsx";
import {deleteRecipe} from "../../util/http.js";
import ModalConfirmation from "./modal/ModalConfirmation.jsx";
import RecipeForm from "../forms/recipe/RecipeForm.jsx";
import useModal from "../../hooks/useModal.jsx";


export default function ManageRecipeMenu({recipe}) {
  const {setModalChildren} = useModal();

  function handleDelete() {
    setModalChildren(
      <ModalConfirmation
        title={"Are you sure?"}
        text={`You are about to delete ${recipe.name}. This operation can not be undone!`}
        onSubmitFn={() => deleteRecipe(recipe.id)}
      />
    )
  }

  function handleEdit() {
    setModalChildren(<RecipeForm initialData={recipe}/>)
  }

  return (
    <menu className={style["manage-recipe"]}>
      <li>
        <Button
          onClick={handleEdit}
          sizeClass={buttonSizeClasses.s}
        >Edit
        </Button></li>
      <li>
        <Button
          typeClass={buttonTypeClasses.delete}
          sizeClass={buttonSizeClasses.s}
          onClick={handleDelete}
        >Delete
        </Button>
      </li>
    </menu>
  );
};
