import * as Yup from "yup";

import validationErrorMessages from "@/utils/error-messages/validationErrorMessages.ts";


const loginFormValidationSchema = Yup.object({
  email: Yup.string()
    .email(validationErrorMessages.email)
    .required(validationErrorMessages.required),
  password: Yup.string()
    .required(validationErrorMessages.required),
});

export default loginFormValidationSchema;