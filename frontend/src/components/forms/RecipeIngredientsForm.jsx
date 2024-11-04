import style from "./CreateRecipeForm.module.css";

import {useEffect, useRef} from "react";

import {FieldArray} from "formik";

import Button from "../UI/Button.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";
import CustomUnitBox from "../UI/CustomUnitBox.jsx";


let scroll;
export default function RecipeIngredientsForm({values}) {
  const listRef = useRef();

  useEffect(() => {
    scroll ? listRef.current?.lastElementChild?.scrollIntoView({behavior: "smooth", block: "center"}) : null;
    scroll = false;
  }, [scroll]);

  return (
    <FieldArray name="ingredients">
      {({insert, remove, push}) => (
        <div className={style["ingredient-list-wrapper"]}>
          <ol ref={listRef} className={style["ingredient-list"]}>
          {
            values.ingredients.length > 0 ? values.ingredients.map((ingredient, index) => (
              <li key={index} className={style["form-ingredient-box"]}>
                <div className={style["form-ingredient-top"]}>
                  <CustomSelect label={"Ingredient:"} name={`ingredients.${index}.name`}>
                    <option value={"uuid123"}>Pepper</option>
                  </CustomSelect>
                  <button className={style["trash"]} type="button" onClick={() => remove(index)}>REMOVE</button>
                </div>
                <div className={style["form-ingredient-bottom"]}>
                  <CustomUnitBox
                    label={"Quantity:"}
                    units={{base: "g", alt: "pcs"}}
                    name={`ingredients.${index}.quantity`}
                    type="number"
                    min={1}
                    max={99999}
                  />
                </div>
              </li>
            )) : <p className={style["no-data"]}>Please add at least one ingredient.</p>
          }
          </ol>
          <Button
            type="button"
            cta
            onClick={() => {
              push({ingredient: "", quantity: 0})
              scroll = true;
            }}
          >Add +</Button>
        </div>
      )}
    </FieldArray>



    // <div className={style["inputs"]}>
    //   <CustomInput label="Ingredients:" name="ingredients" type="text"/>
    // </div>
  );
};
