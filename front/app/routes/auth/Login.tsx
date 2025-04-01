import type {ReactElement} from "react";

import LoginForm from "~/forms/auth/LoginForm";


export default function Login(): ReactElement {
  return (
    <div className={"flex justify-center items-center h-dvh"}>
      <LoginForm/>
    </div>
  );
}
