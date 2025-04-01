import styles from "./FormField.module.css";

import {useField} from "formik";
import type {InputHTMLAttributes, ReactElement} from "react";


interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string,
}

export default function FormField({label, ...props}: IProps): ReactElement {
  const [field, meta] = useField(props);
  const hasError = meta.error && meta.touched;
  
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={props.name || props.id}>{label}</label>}
      <input
        {...field}
        {...props}
      />
      {hasError && <span className={""}>{meta.error}</span>}
    </div>
  );
}