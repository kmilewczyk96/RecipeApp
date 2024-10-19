import {getToken} from "../util/auth-token.js";


export default function RecipesPage() {
  return (
    <></>
  );
};

export async function addRecipeAction({request}) {
  const token = getToken();
  const data = await request.formData();
  const recipe = {
    name: data.get("name"),
    time_minutes: data.get("time-required"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8000/api/recipe/recipes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + token,
    },
    body: JSON.stringify(recipe)
  });

  if (response.status === 400 || response.status === 404) {
    return response;
  }

  if (!response.ok) {
    return null;
  }

  return response;
}
