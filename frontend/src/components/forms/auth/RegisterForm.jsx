import style from "./Form.module.css";

import {Formik, Form} from "formik";
import {Link, useSubmit} from "react-router-dom";
import * as Yup from "yup";

import Button, {buttonTypeClasses} from "../../UI/Button.jsx";
import CustomInput from "../../UI/CustomInput.jsx";


export default function RegisterForm() {
  const submit = useSubmit();

  return (
    <Formik
      initialValues={{name: "", email: "", password1: "", password2: ""}}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(32, "Name is too long! Allowed 32 characters or less.")
          .required("This field is required."),
        email: Yup.string()
          .max(64, "Email is too long! Allowed 64 characters or less.")
          .email("This is not proper email format.")
          .required("This field is required."),
        password1: Yup.string()
          .min(8, "Password must contain at least 8 characters.")
          .required("This field is required."),
        password2: Yup.string()
          .oneOf([Yup.ref("password1"), null], "Password doesn't match!")
          .required("This field is required."),
      })}
      onSubmit={async (values) => {
        submit(values, {method: "post"});
      }}
    >
      <Form>
        <div className={style["form-wrapper"]}>
          <div className={style["inputs"]}>
            <CustomInput
              label="Username:"
              name="name"
              type="text"
            />
            <CustomInput
              label="Email:"
              name="email"
              type="email"
            />
            <CustomInput
              label="Password:"
              name="password1"
              type="password"
            />
            <CustomInput
              label="Confirm Password:"
              name="password2"
              type="password"
            />
          </div>
          <div className={style["actions"]}>
            <Link to="/auth/login">Login</Link>
            <Button typeClass={buttonTypeClasses.submit} type="submit">Submit</Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
