import * as Yup from "yup";

import validationErrorMessages from "@/utils/error-messages/validationErrorMessages.ts";


const registrationFormValidationSchema = Yup.object({
  email: Yup.string()
    .email(validationErrorMessages.email)
    .required(validationErrorMessages.required),
  username: Yup.string()
    .min(2, validationErrorMessages.nameLength)
    .max(32, validationErrorMessages.nameLength)
    .required(validationErrorMessages.required),
  password: Yup.string()
    .min(8, validationErrorMessages.passwordLength)
    .required(validationErrorMessages.required),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), undefined], validationErrorMessages.passwordMatch)
    .required(validationErrorMessages.required)
});

export default registrationFormValidationSchema;