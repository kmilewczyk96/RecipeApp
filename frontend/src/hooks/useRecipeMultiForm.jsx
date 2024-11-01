import {useContext} from "react";

import {RecipeMultiFormContext} from "../store/RecipeMultiFormContext.jsx";


export default function useRecipeMultiForm() {
  return useContext(RecipeMultiFormContext);
};
