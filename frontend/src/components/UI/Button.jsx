import style from "./Button.module.css";


export default function Button({cta, className, children, ...props}) {
  const classes = cta ? style["button"] + " " + style["cta"] : style["button"];

  return (
    <button
      className={classes + " " + className}
      {...props}
    >{children}
    </button>
  );
};