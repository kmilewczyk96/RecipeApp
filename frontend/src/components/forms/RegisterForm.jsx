import style from "./Form.module.css";

import {Form, Link} from "react-router-dom";

import Button from "../UI/Button.jsx";
import CustomInput from "../UI/CustomInput.jsx";


export default function RegisterForm() {
  return (
    <div className={style["form-wrapper"]}>
      <Form method="post">
        <div className={style["inputs"]}>
          <CustomInput id="name" type="text" label="Username:" required/>
          <CustomInput id="email" type="email" label="Email:" required/>
          <CustomInput id="password1" type="password" label="Password:" required/>
          <CustomInput id="password2" type="password" label="Confirm Password:" required/>
        </div>
        <div className={style["actions"]}>
          <Link to="/auth/login">Login</Link>
          <Button cta>Submit</Button>
        </div>
      </Form>
    </div>
  );
};
