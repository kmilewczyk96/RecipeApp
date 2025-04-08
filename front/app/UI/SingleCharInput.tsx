import styles from "./SingleCharInput.module.css";

import {type ForwardedRef, forwardRef, type InputHTMLAttributes, type ReactElement} from "react";
import {useField} from "formik";

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
        onChange={event => {
          const inputValue: string = event.target.value.replace(/\D/g, '');
          field.onChange({target: {name: event.target.name, value: inputValue}});
          if (inputValue.length === 1) {
           props.onChange && props.onChange(event);
          }
        }}
        className={[props.className, styles.base].join(" ")}
      />
    );
  }
);

export default SingleCharInput;