import style from "./ManageRecipeMenu.module.css";

import {useMutation} from "@tanstack/react-query";

import Button, {buttonTypeClasses} from "./Button.jsx";
import queryClient, {deleteRecipe} from "../../util/http.js";
import RecipeForm from "../forms/RecipeForm.jsx";
import {useNavigate} from "react-router-dom";
import useModal from "../../hooks/useModal.jsx";


export default function ManageRecipeMenu({recipe}) {
  const {setModalChildren} = useModal();
  const navi = useNavigate();
  const {mutate} = useMutation({
    mutationFn: () => deleteRecipe(recipe.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["recipes"], refetchType: "none"});
      navi("/my-profile");
    }
  })

  return (
    <menu className={style["manage-recipe"]}>
      <li>
        <Button
          onClick={() => setModalChildren(<RecipeForm initialData={recipe}/>)}
        >Edit
        </Button></li>
      <li>
        <Button
          typeClass={buttonTypeClasses.delete}
          onClick={mutate}
        >Delete
        </Button>
      </li>
    </menu>
  );
};
