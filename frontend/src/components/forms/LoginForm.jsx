import style from "./Form.module.css";

import {Form, Link, useActionData} from "react-router-dom";

import Button from "../UI/Button.jsx";
import CustomInput from "../UI/CustomInput.jsx";


export default function LoginForm() {
  const data = useActionData();
  let errorMessage;
  if (data && data["non_field_errors"]) {
    errorMessage = {
      title: "Invalid credentials!",
      message: "Please check your email and password then try again."
    }
  }

  return (
    <div className={style["form-wrapper"]}>
      {errorMessage && (
        <div className={style["error-message"]}>
          <p>{errorMessage.title}</p>
          <span>{errorMessage.message}</span>
        </div>
      )}
      <Form method="post">
        <div className={style["inputs"]}>
          <CustomInput id="email" type="email" label="Email:" required/>
          <CustomInput id="password" type="password" label="Password:" required/>
        </div>
        <div className={style["actions"]}>
          <Link to="/auth/register">Register</Link>
          <Button cta>Submit</Button>
        </div>
      </Form>
    </div>
  );
};
