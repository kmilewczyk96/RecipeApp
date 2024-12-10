import style from "./RecipeSearchBar.module.css";

import {useSearchParams} from "react-router-dom";

import RecipeFilterForm from "../forms/recipe-filter/RecipeFilterForm.jsx";
import RecipeForm from "../forms/recipe/RecipeForm.jsx";
import Button from "../UI/Button.jsx";
import Search from "../UI/Search.jsx";
import useModal from "/src/hooks/useModal.jsx";


export default function RecipeSearchBar({add=false}) {
  const {setModalChildren} = useModal();
  const [searchParams, setSearchParams] = useSearchParams("");

  function handleAddRecipe() {
    setModalChildren(<RecipeForm/>);
  }

  function handleShowFilters() {
    setModalChildren(<RecipeFilterForm/>)
  }

  function handleSubmit(name) {
    if (name === "") {
      setSearchParams("");
    } else {
      setSearchParams(`?name=${name}`);
    }

  }

  return (
    <div className={style["wrapper"]}>
      {add && (
        <Button
          onClick={handleAddRecipe}
        >Add</Button>
      )}
      <Search fieldName={"name"} placeholder={"Recipe Name"} onSubmit={handleSubmit}/>
      <Button
        onClick={handleShowFilters}
      >Filter</Button>
    </div>
  );
};
