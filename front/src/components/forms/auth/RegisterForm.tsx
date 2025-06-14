import {
  Form,
  Formik,
} from "formik";

import styles from "./AuthForm.module.css";

import type {ReactElement} from "react";

import TwoStepAuthCode from "@/components/forms/auth/TwoStepAuthCode";
import Button from "@/components/UI/Button";
import FormField from "@/components/UI/FormField";
import useModal from "@/hooks/useModal.ts";
import useRegisterUser from "@/hooks/api/auth/useRegisterUser.ts";
import registrationFormValidationSchema from "@/utils/validation-schemas/registrationFormValidationSchema.ts";


export default function RegisterForm(): ReactElement {
  const {setModalChildren} = useModal();
  const registerMutation = useRegisterUser();

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={registrationFormValidationSchema}
      onSubmit={async (values, {setErrors}): Promise<void> => {
        try {
          await registerMutation.mutateAsync(values);
          setModalChildren(<TwoStepAuthCode email={values.email}/>);
        } catch (error: any) {
          setErrors(error.response?.data);
        }
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
          <Button
            buttonType={"primary"}
            type={"submit"}
            fetching={registerMutation.isPending}
            disabled={registerMutation.isPending}
          >Register
          </Button>
        </div>
      </Form>
    </Formik>
  );
}