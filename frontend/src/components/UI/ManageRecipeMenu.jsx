import style from "./ManageRecipeMenu.module.css";

import Button, {buttonTypeClasses} from "./Button.jsx";
import queryClient, {deleteRecipe} from "../../util/http.js";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";


export default function ManageRecipeMenu({recipe}) {
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
      <li><Button>Edit</Button></li>
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
