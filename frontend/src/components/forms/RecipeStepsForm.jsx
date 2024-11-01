import style from "./Form.module.css";

import CustomInput from "../UI/CustomInput.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";


export default function RecipeStepsForm() {
  return (
    <div className={style["inputs"]}>
      <CustomInput label="Step:" name="steps" type="text"/>
    </div>
  );
};
