import {QueryClient} from "@tanstack/react-query";
import {getToken} from "./auth-token.js";


const queryClient = new QueryClient();
export default queryClient;


export async function fetchProfileRecipes({signal, userSuffix}){
  let url = "http://localhost:8000/api/recipe/recipes/";

  if (userSuffix) {
    url += "?user=" + userSuffix;
  }

  const response = await fetch(url, {
    signal,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + getToken(),
    }
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching recipes data.");
    error.code = response.status;
    throw error;
  }

  return await response.json();
}

export async function fetchRecipeFormHelpers({signal}) {
  const response = await fetch("http://localhost:8000/api/recipe/form-helpers/", {
    signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + getToken(),
    }
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching recipe form helpers.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  return await response.json();
}

export async function sendRecipeFormData(formValues){
  const response = await fetch("http://localhost:8000/api/recipe/recipes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + getToken(),
    },
    body: JSON.stringify(formValues),
  });
  if (!response.ok) {
    const error = new Error("An error occurred while trying to send form data.");
    error.code = response.status;
    throw error;
  }
  return await response.json();
}
