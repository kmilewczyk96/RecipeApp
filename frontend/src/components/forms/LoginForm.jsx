import style from "./Form.module.css";

import {Formik, Form} from "formik";
import {Link, useActionData, useSubmit} from "react-router-dom";

import Button from "../UI/Button.jsx";
import CustomInput from "../UI/CustomInput.jsx";


export default function LoginForm() {
  const submit = useSubmit();
  const data = useActionData();
  let errorMessage;
  if (data && data["non_field_errors"]) {
    errorMessage = {
      title: "Invalid credentials!",
      message: "Please check your email and password then try again."
    }
  }


  return (
    <Formik
      initialValues={{email: "", password: ""}}
      onSubmit={async (values) => {
        submit(values, {method: "post"})
      }}
    >
      <div className={style["form-wrapper"]}>
        {errorMessage && (
          <div className={style["error-message"]}>
            <p>{errorMessage.title}</p>
            <span>{errorMessage.message}</span>
          </div>
        )}
        <Form>
          <div className={style["inputs"]}>
            <CustomInput label="Email:" name="email" type="email"/>
            <CustomInput label="Password:" name="password" type="password"/>
          </div>
          <div className={style["actions"]}>
            <Link to="/auth/register">Register</Link>
            <Button cta type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    </Formik>
  );
};
