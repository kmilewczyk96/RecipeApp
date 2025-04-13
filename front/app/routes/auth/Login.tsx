import type {ReactElement} from "react";

import AuthForm from "~/forms/auth/AuthForm";
import LoginForm from "~/forms/auth/LoginForm";


export default function Login(): ReactElement {
  return (
    <div className={"centeredWrapper"}>
      <AuthForm authType={"login"}>
        <LoginForm/>
      </AuthForm>
    </div>
  );
}
