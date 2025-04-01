import styles from "./AuthForm.module.css";

import {
  Form,
  Formik,
} from "formik";
import type {ReactElement} from "react";

import FormField from "~/UI/FormField";


export default function LoginForm(): ReactElement {
  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeWrapper}>
        <h2>Welcome to <em>Recipository</em></h2>
        <p>Browse, create and share recipes with community today.</p>
      </div>
      <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={() => {}}
      >
        <Form className={styles.formWrapper}>
          <FormField
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"creative-user@example.com"}
          />
          <FormField
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"********"}
          />
          <button>Submit</button>
        </Form>
      </Formik>
      <hr/>
      <div className={styles.swapAuthWrapper}>
        <p>Don't have an account? <a>Register</a></p>
        <p>or</p>
        <p><a>Skip</a> for now and use for browsing only.</p>
      </div>
    </div>
  );
}