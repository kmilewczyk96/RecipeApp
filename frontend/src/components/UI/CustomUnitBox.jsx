import style from "./CustomUnitBox.module.css";

import {useField} from "formik";


export default function CustomUnitBox({label, placeholder, units={base: "g"}, ...props}) {
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
        <div className={style["unit-select"]}>
          {units.alt ? (
            <select>
              <option>g</option>
              <option>pcs</option>
            </select>
          ) : (
            <p>{units.base}</p>
          )}
        </div>
        {hasError && <span className={style["error-message"]}>{meta.error}</span>}
      </div>
    </div>
  )
};
