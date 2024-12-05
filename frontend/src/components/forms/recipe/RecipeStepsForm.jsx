import style from "./RecipeForm.module.css";

import {useState} from "react";

import {FieldArray, useFormikContext} from "formik";
import {Reorder, useDragControls, useMotionValue} from "framer-motion";
import {v4 as uuid4} from "uuid";

import IconDraggable from "/src/components/icons/wrappers/IconDraggable.jsx";
import {EnergyRPath} from "/src/components/icons/svg-paths/Regular.jsx";
import Button from "/src/components/UI/Button.jsx";
import CustomInput from "/src/components/UI/CustomInput.jsx";


function RecipeStep({value, index, onRemove}) {
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={value}
      style={{y}}
      dragListener={false}
      dragControls={dragControls}
    >
      <CustomInput
        label={`Step ${index + 1}:`}
        name={`steps.${index}.value`}
        type="text"
      />
      <button
        className={style["trash"]}
        type="button"
        onClick={onRemove}
      >REMOVE
      </button>
      <IconDraggable dragControls={dragControls}>
        <EnergyRPath/>
      </IconDraggable>
    </Reorder.Item>
  )
}


export default function RecipeStepsForm() {
  const {values} = useFormikContext();
  const [scrollTo, setScrollTo] = useState(null);

  function handleReorder(newOrder, swap) {
    const diffIndex = values.steps.findIndex(
      (step, index) => step.id !== newOrder[index].id,
    );
    if (diffIndex !== -1) {
      const newIndex = newOrder.findIndex(
        (step) => step.id === values.steps[diffIndex].id,
      );
      swap(diffIndex, newIndex);
    }
  }


  return (
    <FieldArray name={"steps"}>
      {({remove, push, swap}) => (
        <div className={style["list-wrapper"]}>
          <Reorder.Group
            as="ol"
            axis="y"
            onReorder={(newOrder) => handleReorder(newOrder, swap)}
            values={values.steps}
            className={style["scrollable-list"]}
          >
            {
              values.steps.length > 0 && values.steps.map((step, index) => (
                <RecipeStep
                  key={step.id}
                  className={style["form-box"]}
                  value={step}
                  index={index}
                  onRemove={() => remove(index)}
                />
              ))
            }
          </Reorder.Group>
          <Button
            type="button"
            onClick={() => {
              push({id: uuid4(), value: ""});
            }}
          >Add Step</Button>
        </div>
      )}
    </FieldArray>
  );
};
