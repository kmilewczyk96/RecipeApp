import style from "./RecipeForm.module.css";

import CustomInput from "/src/components/UI/CustomInput.jsx";
import CustomSelect from "/src/components/UI/CustomSelect.jsx";
import CustomUnitBox from "/src/components/UI/CustomUnitBox.jsx";


export default function RecipeAboutForm({cuisineChoices, typeChoices}) {
  return (
    <div className={style["inputs"]}>
      <CustomInput label="Name:" name="name" type="text"/>
      <CustomSelect label="Cuisine:" name="cuisine">
        {Object.entries(cuisineChoices).map(([value, name]) => (
          <option key={value} value={value}>{name}</option>
        ))}
      </CustomSelect>
      <CustomSelect label="Type:" name="type">
        {Object.entries(typeChoices).map(([value, name]) => (
          <option key={value} value={value}>{name}</option>
        ))}
      </CustomSelect>
      <CustomUnitBox
        label="Time required:"
        units={{base: "min"}}
        name="time-required"
        type="number"
        min={1}
        max={2880}
      />
    </div>
  );
};
