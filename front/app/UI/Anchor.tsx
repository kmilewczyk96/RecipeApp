import styles from "./Anchor.module.css";

import type {ReactElement} from "react";
import {Link} from "react-router";


interface IProps {
  to: string,
  linkType: "primary" | "secondary",
  children: string,
}

export default function Anchor({to, linkType, children}: IProps): ReactElement {
    return (
      <Link to={to} className={[styles.base, styles[linkType]].join(" ")}>{children}</Link>
    );
}
