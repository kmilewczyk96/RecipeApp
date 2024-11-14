import style from "./Button.module.css";


export const buttonSizeClasses = {
  s: "small",
  m: "medium",
  l: "large",
}

export const buttonTypeClasses = {
  regular: "regular",
  submit: "submit",
  delete: "delete",
}

export default function Button(
  {
    sizeClass = buttonSizeClasses.m,
    typeClass = buttonTypeClasses.regular,
    children,
    ...props
  }) {
  const classes = [style["button"], style[sizeClass], style[typeClass]].join(" ");
  return (
    <button
      className={classes}
      {...props}
    >{children}
    </button>
  );
};
