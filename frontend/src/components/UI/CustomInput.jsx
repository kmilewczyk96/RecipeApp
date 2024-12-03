import style from "./CustomTag.module.css";

import {useField} from "formik";


export default function CustomInput({label, placeholder, ...props}) {
  const [field, meta] = useField(props);
  const hasError = meta.error && meta.touched;

  return (
    <div
      className={hasError ? [style["custom-tag"], "error"].join(" ") : style["custom-tag"]}
    >
      {label && <label htmlFor={props.name || props.id}>{label}</label>}
      <input
        placeholder={placeholder && placeholder}
        {...field}
        {...props}
      />
      {hasError && <span className={style["error-message"]}>{meta.error}</span>}
    </div>
  );
};
