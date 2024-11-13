import style from "./ManageRecipeMenu.module.css";

import Button from "./Button.jsx";


export default function ManageRecipeMenu({recipe}) {
  return (
    <menu className={style["manage-recipe"]}>
      <li><Button>Edit</Button></li>
      <li><Button>Delete</Button></li>
    </menu>
  );
};