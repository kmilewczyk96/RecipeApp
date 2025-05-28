import type {ReactElement} from "react";

import AuthForm from "@/components/forms/auth/AuthForm";
import LoginForm from "@/components/forms/auth/LoginForm";
import {createFileRoute} from "@tanstack/react-router";


export const Route = createFileRoute('/login')({
  component: Login,
})

function Login(): ReactElement {
  return (
    <div className={"centeredWrapper"}>
      <AuthForm authType={"login"}>
        <LoginForm/>
      </AuthForm>
    </div>
  );
}
