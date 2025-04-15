import styles from "./AuthForm.module.css";

import {
  Form,
  Formik,
} from "formik";
import type {ReactElement} from "react";

import Button from "~/UI/Button";
import FormField from "~/UI/FormField";
import useModal from "~/hooks/useModal";
import TwoStepAuthCode from "~/forms/auth/TwoStepAuthCode";


export default function RegisterForm(): ReactElement {
  const {setModalChildren} = useModal();

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
    }}
      onSubmit={(values) => {
        setModalChildren(<TwoStepAuthCode email={values.email}/>)
      }}
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
            label={"Username"}
            name={"username"}
            placeholder={"creative-user123"}
          />
          <FormField
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"************"}
          />
          <FormField
            label={"Confirm Password"}
            name={"passwordConfirmation"}
            type={"password"}
            placeholder={"************"}
          />
        </div>
        <div className={styles.actions}>
          <Button buttonType={"primary"}>Register</Button>
        </div>
      </Form>
    </Formik>
  );
}