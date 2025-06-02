import {forwardRef} from "react";

import styles from "./Button.module.css";

import type {ButtonHTMLAttributes, ForwardedRef, ReactElement} from "react";


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "secondary" | "tertiary",
  colorTheme?: "primary" | "secondary" | "warning",
  fetching?: boolean,
  className?: string,
  children: string,
}

const Button = forwardRef<HTMLButtonElement, IProps>(
  (
    {buttonType, colorTheme = "primary", className = "", fetching=false, children, ...props}: IProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): ReactElement => {
    return (
      <button
        className={[
          styles.wrapper,
          styles[buttonType],
          styles[colorTheme + "Color"],
          fetching ? styles.fetching : undefined,
          className
        ].join(" ")}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
