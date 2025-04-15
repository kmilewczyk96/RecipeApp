import styles from "./AuthForm.module.css";

import {
  Form,
  Formik,
} from "formik";
import type {ReactElement} from "react";

import loginFormValidationSchema from "~/forms/validation-schemas/loginFormValidationSchema";
import Button from "~/UI/Button";
import FormField from "~/UI/FormField";


export default function LoginForm(): ReactElement {
  return (
    <Formik
      initialValues={{email: "", password: ""}}
      validationSchema={loginFormValidationSchema}
      onSubmit={() => {}}
    >
      <Form className={styles.formWrapper}>
        <div className={styles.inputs}>
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
            placeholder={"************"}
          />
        </div>
        <div className={styles.actions}>
          <Button buttonType={"primary"}>Log In</Button>
        </div>
      </Form>
    </Formik>
  );
}