import style from "./RecipeForm.module.css";

import {useEffect, useRef, useState} from "react";

import {FieldArray, useFormikContext} from "formik";

import Button from "/src/components/UI/Button.jsx";
import CustomInput from "/src/components/UI/CustomInput.jsx";


export default function RecipeStepsForm() {
  const {values} = useFormikContext();
  const [scrollTo, setScrollTo] = useState(null);


  return (
    <FieldArray name={"steps"}>
      {({remove, push}) => (
        <div className={style["list-wrapper"]}>
          <ol className={style["scrollable-list"]}>
            {
              values.steps.length > 0 && values.steps.map((step, index) => (
                <li key={index} className={style["form-box"]}>
                  <div className={style["form-box-top"]}>
                    <CustomInput
                      label={`Step ${index + 1}:`}
                      name={`steps.${index}`}
                      type="text"
                    />
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
          >Add Step</Button>
        </div>
      )}
    </FieldArray>
  );
};
