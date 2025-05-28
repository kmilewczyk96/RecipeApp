import * as Yup from "yup";

import validationErrorMessages from "@/components/forms/validation-schemas/validationErrorMessages";


const loginFormValidationSchema = Yup.object({
  email: Yup.string()
    .email(validationErrorMessages.email)
    .required(validationErrorMessages.required),
  password: Yup.string()
    .required(validationErrorMessages.required),
});

export default loginFormValidationSchema;