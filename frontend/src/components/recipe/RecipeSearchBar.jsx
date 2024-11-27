import style from "./RecipeSearchBar.module.css";

import {useSearchParams} from "react-router-dom";

import Button from "../UI/Button.jsx";
import Search from "../UI/Search.jsx";


export default function RecipeSearchBar({add=false}) {
  const [searchParams, setSearchParams] = useSearchParams("");

  function handleSubmit(name) {
    setSearchParams(`?name=${name}`);
  }

  return (
    <div className={style["wrapper"]}>
      {add && <Button>Add</Button>}
      <Search fieldName={"name"} placeholder={"Recipe Name"} onSubmit={handleSubmit}/>
      <Button>Filter</Button>
    </div>
  );
};
