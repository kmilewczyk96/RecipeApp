import style from "./RecipeForm.module.css";

import {useEffect, useState} from "react";

import {FieldArray, useFormikContext} from "formik";
import {Reorder, useDragControls, useMotionValue} from "framer-motion";
import {v4 as uuid4} from "uuid";

import IconButton from "/src/components/icons/wrappers/IconButton.jsx";
import IconDraggable from "/src/components/icons/wrappers/IconDraggable.jsx";
import {DragRPath, TrashRPath} from "/src/components/icons/svg-paths/Regular.jsx";
import Button from "/src/components/UI/Button.jsx";
import CustomInput from "/src/components/UI/CustomInput.jsx";


function RecipeStep({value, index, onRemove, autoFocusFirst}) {
  const [isDragged, setIsDragged] = useState(false);
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      onDragStart={() => setIsDragged(true)}
      onDragEnd={() => setIsDragged(false)}
      dragControls={dragControls}
      className={style["step-wrapper"]}
      style={{y, zIndex: isDragged ? 2 : 1}}
    >
      <CustomInput
        label={`Step ${index + 1}:`}
        id={value.id}
        name={`steps.${index}.value`}
        type="text"
        autoFocus={autoFocusFirst}
      />
      <IconDraggable dragControls={dragControls} size={"20"}>
        <DragRPath/>
      </IconDraggable>
      <IconButton onClick={onRemove} size={"20"}>
        <TrashRPath/>
      </IconButton>
    </Reorder.Item>
  )
}


export default function RecipeStepsForm({autoFocusFirst}) {
  const {values} = useFormikContext();
  const [scrollTo, setScrollTo] = useState(null);

  useEffect(() => {
    if (scrollTo) {
      const target = document.getElementById(scrollTo);
      target.scrollIntoView({behavior: "smooth", block: "center"});
      target.focus({preventScroll: true});
    }
  }, [scrollTo]);

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
                  autoFocusFirst={autoFocusFirst && values.steps.length === 1 && step.value === ""}
                />
              ))
            }
          </Reorder.Group>
          <Button
            type="button"
            onClick={() => {
              const id = uuid4();
              push({id, value: ""});
              setScrollTo(id);
            }}
          >Add Step</Button>
        </div>
      )}
    </FieldArray>
  );
};
