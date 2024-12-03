import style from "./RecipeForm.module.css";

import {useEffect, useRef} from "react";

import {FieldArray, useFormikContext} from "formik";

import Button from "/src/components/UI/Button.jsx";
import CustomSelect from "/src/components/UI/CustomSelect.jsx";
import CustomUnitBox from "/src/components/UI/CustomUnitBox.jsx";


let scroll;
let usedIngredients = [];
export default function RecipeIngredientsForm({ingredients}) {
  const listRef = useRef();
  const {handleChange, values, setFieldValue, setFieldTouched, errors} = useFormikContext();

  // useEffect(() => {
  //   usedIngredients = [];
  //   values.ingredients.filter(i => i.ingredient.id !== "").map(i => usedIngredients.push(i.ingredient.id));
  //   scroll ? listRef.current?.lastElementChild?.scrollIntoView({behavior: "smooth", block: "center"}) : null;
  // }, [values.ingredients]);

  async function handleIngredientChange(e, index) {
    handleChange(e);
    await setFieldTouched(`ingredients.${index}.quantity`, false)
    await setFieldValue(`ingredients.${index}.quantity`, "", false);
    scroll = true;
  }

  return (
    <FieldArray name="ingredients">
      {({remove, push}) => (
        <div className={style["list-wrapper"]}>
          <ol
            ref={listRef}
            className={typeof errors["ingredients"] === "string" ? (
              [style["scrollable-list"], "error"].join(" ")
            ) : (
              style["scrollable-list"]
            )}
          >
          {
            values.ingredients.length > 0 ? values.ingredients.map((ingredient, index) => (
              <li key={index} className={style["form-box"]}>
                <div className={style["form-box-top"]}>
                  <CustomSelect
                    label={"Ingredient:"}
                    name={`ingredients.${index}.ingredient.id`}
                    required
                    onChange={(e) => handleIngredientChange(e, index)}
                  >
                    <option className={style["select-placeholder"]} value="" hidden>Select an ingredient</option>
                    {Object.entries(ingredients).map(([key, data]) => (
                      (!usedIngredients.includes(key) || values.ingredients[index].ingredient.id === key) &&
                      <option
                        key={key}
                        value={key}
                      >{data.name}</option>
                    ))}
                  </CustomSelect>
                  <button
                    className={style["trash"]}
                    type="button"
                    onClick={() => {
                      remove(index);
                    }}
                  >REMOVE</button>
                </div>
                {
                  values.ingredients[index].ingredient.id && (
                    <div className={style["form-box-bottom"]}>
                      <CustomUnitBox
                        key={values.ingredients[index].ingredient.id}
                        label={"Quantity:"}
                        units={{
                          base: ingredients[values.ingredients[index].ingredient.id].unit,
                          alt: ingredients[values.ingredients[index].ingredient.id].alt_unit,
                          ratio: ingredients[values.ingredients[index].ingredient.id].alt_to_unit_conversion,
                      }}
                        name={`ingredients.${index}.quantity`}
                        type="number"
                        autoFocus
                      />
                    </div>
                  )
                }
              </li>
            )) : <p className={style["no-data"]}>Please add at least one ingredient.</p>
          }
          </ol>
          <Button
            type="button"
            onClick={() => {
              push({
                ingredient: {
                  id: "",
                },
                quantity: "",
                quantityAlt: "",
              })
              scroll = true;
            }}
          >Add Ingredient</Button>
        </div>
      )}
    </FieldArray>
  );
};
