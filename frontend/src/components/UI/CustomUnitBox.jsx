import style from "./CustomUnitBox.module.css";

import {useField} from "formik";


export default function CustomUnitBox({label, units, placeholder, ...props}) {
  const [field, meta] = useField(props);
  const hasError = meta.error && meta.touched;

  return (
    <div className={style["custom-unit-box"]}>
      {label && <label htmlFor={props.name || props.id} className={hasError ? style["error"] : null}>{label}</label>}
      <div className={style["unit-box-wrapper"]}>
        <input
          placeholder={placeholder && placeholder}
          className={hasError ? style["error"] : null}
          {...field}
          {...props}
        />
        <p>{units}</p>
        {hasError && <span className={style["error-message"]}>{meta.error}</span>}
      </div>
    </div>
  )
};
