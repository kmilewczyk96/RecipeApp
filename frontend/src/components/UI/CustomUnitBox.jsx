import style from "./CustomUnitBox.module.css";

import {useField, useFormikContext} from "formik";
import {useState} from "react";

import {convertToAltUnits, convertToBaseUnits} from "/src/util/converters.js";


export default function CustomUnitBox({label, placeholder, units, ...props}) {
  const {handleChange, setFieldValue} = useFormikContext();
  const [field, meta] = useField(props.name);
  const [altField, altMeta] = useField(props.name + "Alt");
  const [isAltUnit, setIsAltUnit] = useState(false);
  const hasError = meta.error && meta.touched;
  const altHasError = altMeta.error && altMeta.touched;

  async function handleUnitChange(e) {
    if (e.target.value === "base") {
      setIsAltUnit(false);
    } else {
      setIsAltUnit(true);
      if (field.value !== "") {
        const altValue = convertToAltUnits(field.value, units.ratio);
        await setFieldValue(altField.name, altValue, false);
      }
    }
  }

  async function handleAltQtyChange(e) {
    handleChange(e);
    let value;
    if (e.target.value !== "") {
      value = convertToBaseUnits(e.target.value, units.ratio);
    } else {
      value = "";
    }
    await setFieldValue(field.name, value, true);
  }

  return (
    <div className={
      (hasError || altHasError) ? [style["custom-unit-box"], "error"].join(" ") : style["custom-unit-box"]
    }>
      {label && <label htmlFor={props.name || props.id} className={hasError ? style["error"] : null}>{label}</label>}
      <div className={style["unit-box-wrapper"]}>
        {isAltUnit ? (
          <input
            {...altField}
            onChange={(e) => handleAltQtyChange(e)}
          />
        ): (
          <input
            placeholder={placeholder && placeholder}
            className={hasError ? style["error"] : null}
            {...field}
            {...props}
          />
        )}
        <div className={style["unit-select"]}>
          {units.alt ? (
            <select onChange={(e) => handleUnitChange(e)}>
            <option value={"base"}>{units.base}</option>
              <option value={"alt"}>{units.alt}</option>
            </select>
          ) : (
            <p>{units.base}</p>
          )}
        </div>
        {hasError && <span className={style["error-message"]}>{meta.error}</span>}
        {altHasError && <span className={style["error-message"]}>{altMeta.error}</span>}
      </div>
    </div>
  )
};
