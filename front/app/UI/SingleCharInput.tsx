import styles from "./SingleCharInput.module.css";

import {type ForwardedRef, forwardRef, type InputHTMLAttributes, type ReactElement} from "react";
import {useField} from "formik";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const SingleCharInput = forwardRef<HTMLInputElement, IProps>(
  ({...props}: IProps, ref: ForwardedRef<HTMLInputElement>): ReactElement => {
    const [field] = useField(props);

    return (
      <input
        type={"text"}
        inputMode={"numeric"}
        maxLength={1}
        ref={ref}
        {...field}
        {...props}
        onChange={e => {
          field.onChange(e);
          props?.onChange && props.onChange(e);
        }}
        className={[props.className, styles.base].join(" ")}
      />
    );
  }
);

export default SingleCharInput;