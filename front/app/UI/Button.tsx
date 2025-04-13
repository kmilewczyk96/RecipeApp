import styles from "./Button.module.css";

import {
  type ButtonHTMLAttributes,
  type ReactElement,
  forwardRef, type ForwardedRef
} from "react";


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "secondary" | "tertiary",
  colorTheme?: "primary" | "secondary" | "warning",
  className?: string,
  children: string,
}

const Button = forwardRef<HTMLButtonElement, IProps>(
  (
    {buttonType, colorTheme = "primary", className = "", children, ...props}: IProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): ReactElement => {
    return (
      <button
        className={[styles.wrapper, styles[buttonType], styles[colorTheme + "Color"], className].join(" ")}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
