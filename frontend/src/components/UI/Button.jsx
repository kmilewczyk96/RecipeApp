import style from "./Button.module.css";


export default function Button({cta, children, ...props}) {
  const classes = cta ? style["button"] + " " + style["cta"] : style["button"];

  return (
    <button
      className={classes}
      {...props}
    >{children}
    </button>
  );
};