import styles from "./Button.module.css";

import type {ButtonHTMLAttributes, ReactElement} from "react";


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "secondary" | "tertiary",
  colorTheme?: "primary" | "secondary" | "warning",
  className?: string,
  children: string,
}

export default function Button({buttonType, colorTheme="primary", className="", children, ...props}: IProps): ReactElement {
  return (
    <button
      className={[styles.wrapper, styles[buttonType], styles[colorTheme + "Color"], className].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
