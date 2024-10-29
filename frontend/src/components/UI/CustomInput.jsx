import style from "./CustomTag.module.css";


export default function CustomInput({label, id, textArea, ...props}) {
  return (
    <div className={style["custom-tag"]}>
      <label htmlFor={id}>{label}</label>
      {
        textArea ? (
          <textarea id={id} name={id} {...props}/>
        ) : (
          <input id={id} name={id} {...props}/>
        )
      }
    </div>
  );
};
