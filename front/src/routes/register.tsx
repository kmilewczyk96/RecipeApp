import type {ReactElement} from "react";

import AuthForm from "@/components/forms/auth/AuthForm";
import RegisterForm from "@/components/forms/auth/RegisterForm";
import {createFileRoute} from "@tanstack/react-router";


export const Route = createFileRoute('/register')({
  component: Register,
})

function Register(): ReactElement {
  return (
    <div className={"centeredWrapper"}>
      <AuthForm authType={"register"}>
        <RegisterForm/>
      </AuthForm>
    </div>
  );
}
