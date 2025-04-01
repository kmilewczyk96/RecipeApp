import styles from "./Button.module.css";

import type {ButtonHTMLAttributes, ReactElement} from "react";


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "secondary",
  monochrome?: boolean,
  children: string,
}

export default function Button({buttonType, monochrome=false, children, ...props}: IProps): ReactElement {
  return (
    <button
      className={[styles.wrapper, styles[buttonType], monochrome ? styles.monochrome : undefined].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
