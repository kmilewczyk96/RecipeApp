import type {ReactElement} from "react";

import AuthForm from "~/forms/auth/AuthForm";
import RegisterForm from "~/forms/auth/RegisterForm";


export default function Register(): ReactElement {
  return (
    <div className={"centeredWrapper"}>
      <AuthForm authType={"register"}>
        <RegisterForm/>
      </AuthForm>
    </div>
  );
}
