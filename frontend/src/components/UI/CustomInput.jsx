import style from "./CustomInput.module.css";


export default function CustomInput({label, id, textArea, ...props}) {
  return (
    <div className={style["custom-input"]}>
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
