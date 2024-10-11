import style from "./Button.module.css";


export default function Button({cta, children, ...props}) {
  return (
    <button className={cta ? style["button"] + " " + style["cta"] : style["button"]} {...props}>{children}</button>
  )
};