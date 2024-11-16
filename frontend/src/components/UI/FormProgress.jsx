import style from "./FormProgress.module.css";


export default function FormProgress({currentStep, steps}) {
  return (
    <>
      <h3 className={style["step-name"]}>{steps[currentStep]}</h3>
      <ul className={style["form-progress-wrapper"]}>
        {
          steps.map((step, index) => (
            <li key={index} className={index === currentStep ? style["current"] : null}>

            </li>
          ))
        }
      </ul>
    </>
  );
};