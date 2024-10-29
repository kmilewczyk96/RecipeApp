import style from "./CustomTag.module.css";


export default function CustomSelect({label, id, children, ...props}) {
  return (
    <div className={style["custom-tag"]}>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} {...props}>
        {children}
      </select>
    </div>
  );
};
