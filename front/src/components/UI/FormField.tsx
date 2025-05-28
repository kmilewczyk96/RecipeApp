import {useField} from "formik";

import styles from "./FormField.module.css";

import type {InputHTMLAttributes, ReactElement} from "react";


interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string,
}

export default function FormField({label, ...props}: IProps): ReactElement {
  const [field, meta] = useField(props);
  const hasError = meta.error && meta.touched;
  
  return (
    <div className={[styles.wrapper, hasError && styles.error].join(" ")}>
      {label && <label htmlFor={props.name || props.id}>{label}</label>}
      <input
        {...field}
        {...props}
      />
      {hasError && <span className={styles.errorMessage}>{meta.error}</span>}
    </div>
  );
}