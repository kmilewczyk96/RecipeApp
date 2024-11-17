import {redirect} from "react-router-dom";

import LoginForm from "../components/forms/LoginForm.jsx";


export default function LoginPage() {
  return (
    <LoginForm/>
  );
};
export async function loginAction({request}){
  const data = await request.formData();
  const credentials = {
    email: data.get("email"),
    password: data.get("password")
  }

  const response = await fetch("http://localhost:8000/api/user/token/", {
    method: request.method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    return null;
  }

  const resData = await response.json();
  localStorage.setItem("token", resData.token);
  localStorage.setItem("userID", resData.userID);

  return redirect("/my-profile");
}
