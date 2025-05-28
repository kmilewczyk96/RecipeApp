import styles from "./AuthForm.module.css";

import type {ReactElement} from "react";

import Anchor from "@/components/UI/Anchor";


interface IProps {
  authType: "login" | "register",
  children: ReactElement,
}

export default function AuthForm({authType, children}: IProps): ReactElement {
  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeWrapper}>
        <h2>Welcome to <em>Recipository</em></h2>
        <p>Browse, create and share recipes with community today.</p>
      </div>
      {children}
      <hr/>
      <div className={styles.swapAuthWrapper}>
        {
          authType === "login" ? (
            <p>Don't have an account? <Anchor to={"/register"} linkType={"primary"}>Register</Anchor></p>
          ) : (
            <p>Don't have an account? <Anchor to={"/login"} linkType={"primary"}>Log In</Anchor></p>
          )
        }
        <p>or</p>
        <p><Anchor to={"/"} linkType={"secondary"}>Skip</Anchor> for now and use for browsing only.</p>
      </div>
    </div>
  );
}