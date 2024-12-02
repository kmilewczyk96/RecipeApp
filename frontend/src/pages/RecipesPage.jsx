import style from "./layouts/RecipesLayout.module.css";

import {useQuery} from "@tanstack/react-query";

import RecipeGrid from "/src/components/recipe/RecipeGrid.jsx";
import queryClient, {fetchRecipes} from "/src/util/http.js";
import {useSearchParams} from "react-router-dom";


export default function RecipesPage() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["recipes", {name: name}],
    queryFn: ({signal}) => fetchRecipes({signal, name})
  });

  return (
    <div className={style["recipes-layout"]}>
      {(data && !isLoading) && (
        <RecipeGrid
          addRecipe={true}
          noRecipeMessage={"No recipes. Be the first user to add recipe!"}
          recipes={data}
        />
      )}
    </div>
  );
};


export async function recipesLoader({request}) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const name = params.get("name");

  return queryClient.fetchQuery({
    queryKey: ["recipes", {name: name}],
    queryFn: ({signal}) => fetchRecipes({signal, name})
  });
}
