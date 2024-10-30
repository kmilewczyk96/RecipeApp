import style from "./CustomTag.module.css";

import {useField} from "formik";


export default function CustomSelect({label, ...props}) {
  const [field, meta] = useField(props);
  const hasError = meta.error && meta.touched;

  return (
    <div className={style["custom-tag"]}>
      <label htmlFor={props.name || props.id} className={hasError ? style["error"] : null}>{label}</label>
      <select className={hasError ? style["error"] : null} {...field} {...props}/>
      {hasError && <span className={style["error-message"]}>{meta.error}</span>}
    </div>
  );
};