import {Field} from "formik";


export default function FormikInput({textAlign="left", ...props}) {
  return (
    <Field
      style={{
        textAlign: textAlign,
      }}
      {...props}
    />
  );
};