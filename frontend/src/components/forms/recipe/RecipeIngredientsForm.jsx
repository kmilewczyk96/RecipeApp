import style from "./RecipeForm.module.css";

import {useEffect, useState} from "react";

import {FieldArray, useFormikContext} from "formik";

import Button from "/src/components/UI/Button.jsx";
import CustomSelect from "/src/components/UI/CustomSelect.jsx";
import CustomUnitBox from "/src/components/UI/CustomUnitBox.jsx";


export default function RecipeIngredientsForm({ingredients}) {
  const {handleChange, values, setFieldValue, setFieldTouched, errors} = useFormikContext();
  const [scrollTo, setScrollTo] = useState(null);
  const [usedIngredients, setUsedIngredients] = useState(() => {
    const _usedIngredients = [];
    values.ingredients.filter(i => i.ingredient.id !== "").map(i => _usedIngredients.push(i.ingredient.id));
    return _usedIngredients;
  });

  useEffect(() => {
    if (scrollTo) {
      const target = document.getElementById(scrollTo.trim());
      target.scrollIntoView({behavior: "smooth", block: "center"});
      target.focus({preventScroll: true});
    }
  }, [scrollTo]);

  function handleAddIngredient() {
    setScrollTo(`ingredients.${values.ingredients.length}.ingredient.id`)
  }

  async function handleIngredientChange(e, index) {
    const ingredientToReplace = values.ingredients[index].ingredient.id;
    if (ingredientToReplace === "") {
      setUsedIngredients(prevState => [...prevState, e.target.value]);
    } else {
      setUsedIngredients(prevState => {
        return [...prevState.filter(i => i !== ingredientToReplace), e.target.value];
      })
    }
    handleChange(e);
    await setFieldTouched(`ingredients.${index}.quantity`, false)
    await setFieldValue(`ingredients.${index}.quantity`, "", false);
    if (scrollTo === `ingredients.${index}.quantity`) {
      // Special use case to trigger UseEffect when User changes same Ingredient select field twice.
      setScrollTo(`ingredients.${index}.quantity `);
    } else {
      setScrollTo(`ingredients.${index}.quantity`);
    }
  }

  return (
    <FieldArray
      name="ingredients"
      render={
        ({remove, push}) => (
        <div className={style["list-wrapper"]}>
          <ol
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
                    id={`ingredients.${index}.ingredient.id`}
                    name={`ingredients.${index}.ingredient.id`}
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
                        id={`ingredients.${index}.quantity`}
                        name={`ingredients.${index}.quantity`}
                        type="number"
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
              handleAddIngredient();
              push({
                ingredient: {
                  id: "",
                },
                quantity: "",
                quantityAlt: "",
              })
            }}
          >Add Ingredient</Button>
        </div>
      )
      }
    />
  );
};
