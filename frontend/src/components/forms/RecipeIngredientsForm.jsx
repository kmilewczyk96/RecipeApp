import style from "./Form.module.css";

import {FieldArray} from "formik";

import CustomInput from "../UI/CustomInput.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";
import Button from "../UI/Button.jsx";


export default function RecipeIngredientsForm({values}) {
  return (
    <FieldArray name="ingredients">
      {({insert, remove, push}) => (
        <div>
          <ol className={style["ingredient-list"]}>
          {
            values.ingredients.length > 0 && values.ingredients.map((ingredient, index) => (
              <li key={index} className={style["form-ingredient-box"]}>
                <CustomSelect label={"Ingredient:"} name={`ingredients.${index}.name`}/>
                <div className={style["form-ingredient-box-actions"]}>
                  <CustomInput name={`ingredients.${index}.quantity`} type="number"/>
                  <button className={style["thrash"]} type="button" onClick={() => remove(index)}>Delete</button>
                </div>
              </li>
            ))
          }
          </ol>
          <Button
            type="button"
            cta
            onClick={() => push({ingredient: "", quantity: 0})}
          >Add +</Button>
        </div>
      )}
    </FieldArray>



    // <div className={style["inputs"]}>
    //   <CustomInput label="Ingredients:" name="ingredients" type="text"/>
    // </div>
  );
};
