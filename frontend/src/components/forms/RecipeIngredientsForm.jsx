import style from "./CreateRecipeForm.module.css";

import {FieldArray} from "formik";

import CustomInput from "../UI/CustomInput.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";
import Button from "../UI/Button.jsx";
import {useEffect, useRef} from "react";

let scroll;

export default function RecipeIngredientsForm({values}) {
  const listRef = useRef();

  useEffect(() => {
    console.log("here")
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
                  <CustomSelect name={`ingredients.${index}.name`}>
                    <option value={"uuid123"}>Pepper</option>
                  </CustomSelect>
                  <button className={style["thrash"]} type="button" onClick={() => remove(index)}>Delete</button>
                </div>
                <div className={style["form-ingredient-bottom"]}>
                  <CustomInput placeholder={"Quantity"} name={`ingredients.${index}.quantity`} type="number"/>
                </div>
              </li>
            )) : <p className={style["no-data"]}>Please add at least one ingredient.</p>
          }
          </ol>
          <Button
            type="button"
            cta
            onClick={() => {
              push({ingredient: "", quantity: ""})
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
