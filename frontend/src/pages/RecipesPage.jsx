import style from "./layouts/RecipesLayout.module.css";

import {useQuery} from "@tanstack/react-query";

import RecipeGrid from "/src/components/recipe/RecipeGrid.jsx";
import queryClient, {fetchRecipes} from "/src/util/http.js";


export default function RecipesPage() {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["recipes"],
    queryFn: ({signal}) => fetchRecipes({signal})
  });

  return (
    <div className={style["recipes-layout"]}>
      {(data && !isLoading) && <RecipeGrid recipes={data}/>}
    </div>
  );
};


export async function recipesLoader() {
  return queryClient.fetchQuery({
    queryKey: ["recipes"],
    queryFn: ({signal}) => fetchRecipes({signal})
  });
}
