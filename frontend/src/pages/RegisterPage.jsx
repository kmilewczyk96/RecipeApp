import RegisterForm from "../components/forms/RegisterForm.jsx";
import {redirect} from "react-router-dom";


export default function RegisterPage() {
  return (
    <RegisterForm/>
  );
};
export async function registerAction({request}){
  const data = await request.formData();
  console.log(data);
  const requestBody = {
    email: data.get("email"),
    password: data.get("password1"),
    name: data.get("name")
  };

  const response = await fetch("http://localhost:8000/api/user/create/", {
    method: request.method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    console.log(response);
    return redirect("/");
  }

  return response;
}
