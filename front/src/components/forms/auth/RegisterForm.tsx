import {
  Form,
  Formik,
} from "formik";

import styles from "./AuthForm.module.css";

import type {ReactElement} from "react";

import TwoStepAuthCode from "@/components/forms/auth/TwoStepAuthCode";
import registrationFormValidationSchema from "@/components/forms/validation-schemas/registrationFormValidationSchema";
import Button from "@/components/UI/Button";
import FormField from "@/components/UI/FormField";

import useModal from "@/hooks/useModal";


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
      validationSchema={registrationFormValidationSchema}
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
          <Button buttonType={"primary"} type={"submit"}>Register</Button>
        </div>
      </Form>
    </Formik>
  );
}