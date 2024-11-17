import style from "./layouts/AuthLayout.module.css";

import {redirect} from "react-router-dom";

import RegisterForm from "../components/forms/auth/RegisterForm.jsx";


export default function RegisterPage() {
  return (
    <div className={style["auth-layout"]}>
      <RegisterForm/>
    </div>
  );
};

export async function registerAction({request}){
  const data = await request.formData();
  const requestBody = {
    email: data.get("email"),
    password: data.get("password1"),
    name: data.get("name")
  };

  const response = await fetch("http://localhost:8000/api/user/users/", {
    method: request.method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    return redirect("/auth/login");
  }

  return response;
}
