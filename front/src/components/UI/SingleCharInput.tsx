import {useField} from "formik";
import {forwardRef} from "react";

import styles from "./SingleCharInput.module.css";

import type {ForwardedRef, InputHTMLAttributes, ReactElement} from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const SingleCharInput = forwardRef<HTMLInputElement, IProps>(
  ({...props}: IProps, ref: ForwardedRef<HTMLInputElement>): ReactElement => {
    const [field, meta] = useField(props);

    return (
      <input
        type={"text"}
        inputMode={"numeric"}
        maxLength={1}
        ref={ref}
        {...field}
        {...props}
        onChange={e => {
          props.onChange && props.onChange(e);
          field.onChange(e);
        }}
        className={[props.className, styles.base, meta.error && meta.touched && styles.error].join(" ")}
      />
    );
  }
);

export default SingleCharInput;