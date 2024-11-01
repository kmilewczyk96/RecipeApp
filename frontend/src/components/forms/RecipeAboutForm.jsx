import style from "./Form.module.css";

import CustomInput from "../UI/CustomInput.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";


export default function RecipeAboutForm() {
  return (
    <div className={style["inputs"]}>
      <CustomInput label="Name:" name="name" type="text"/>
      <CustomSelect label="Cuisine:" name="cuisine">
        <option value="american">American</option>
        <option value="chinese">Chinese</option>
        <option value="french">French</option>
        <option value="greek">Greek</option>
        <option value="indian">Indian</option>
        <option value="italian">Italian</option>
        <option value="japanese">Japanese</option>
        <option value="lebanese">Lebanese</option>
        <option value="mexican">Mexican</option>
        <option value="thai">Thai</option>
        <option value="turkish">Turkish</option>
        <option value="vietnamese">Vietnamese</option>
        <option value="other">Other</option>
      </CustomSelect>
      <CustomSelect label="Type:" name="type">
        <option value="cold_beverage">Cold beverage</option>
        <option value="dessert">Dessert</option>
        <option value="hot_beverage">Hot beverage</option>
        <option value="main">Main</option>
        <option value="snack">Snack</option>
        <option value="soup">Soup</option>
        <option value="other">Other</option>
      </CustomSelect>
      <CustomInput label="Time required:" name="time-required" type="number" min={1} max={2880}/>
    </div>
  );
};
