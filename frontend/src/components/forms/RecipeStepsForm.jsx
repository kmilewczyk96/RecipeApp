import style from "./CreateRecipeForm.module.css";

import {useEffect, useRef} from "react";

import {FieldArray, useFormikContext} from "formik";

import Button from "../UI/Button.jsx";
import CustomInput from "../UI/CustomInput.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";


export default function RecipeStepsForm() {
  const listRef = useRef();
  const {values} = useFormikContext();

  useEffect(() => {
    scroll ? listRef.current?.lastElementChild?.scrollIntoView({behavior: "smooth", block: "center"}) : null;
  }, [values.steps]);

  return (
    <FieldArray name={"steps"}>
      {({remove, push}) => (
        <div className={style["list-wrapper"]}>
          <ol ref={listRef} className={style["scrollable-list"]}>
            {
              values.steps.length > 0 && values.steps.map((step, index) => (
                <li key={index} className={style["form-box"]}>
                  <div className={style["form-box-top"]}>
                    <CustomInput label={`Step ${index + 1}:`} name={`steps.${index}`} type="text"/>
                    <button
                      className={style["trash"]}
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                    >REMOVE
                    </button>
                  </div>
                </li>
              ))
            }
          </ol>
          <Button
            type="button"
            onClick={() => {
              push("");
            }}
          >Add +</Button>
        </div>
      )}
    </FieldArray>
  );
};
