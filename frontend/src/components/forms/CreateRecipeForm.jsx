import style from "./CreateRecipeForm.module.css";

import {Formik, Form, validateYupSchema, yupToFormErrors} from "formik";
import {useContext, useEffect} from "react";
import {useFetcher} from "react-router-dom";
import * as Yup from "yup";

import Button from "../UI/Button.jsx";
import Modal from "../UI/Modal.jsx";
import {ModalContext} from "../../store/ModalContext.jsx";
import useRecipeMultiForm from "../../hooks/useRecipeMultiForm.jsx";
import RecipeAboutForm from "./RecipeAboutForm.jsx";
import RecipeIngredientsForm from "./RecipeIngredientsForm.jsx";
import RecipeStepsForm from "./RecipeStepsForm.jsx";


export default function CreateRecipeForm() {
  const fetcher = useFetcher();
  const {data, state} = fetcher;
  const {mode, hide} = useContext(ModalContext);
  const formCtx = useRecipeMultiForm();
  const finalStep = formCtx.step === 2;
  let errorMessage;

  useEffect(() => {
    if (state === "idle" && data) {
      hide();
    }
  }, [data, state]);

  return (
    <Modal isOpen={mode === "create-recipe-form"} onClose={hide}>
      <div className={style["modal-form-wrapper"]}>
        {errorMessage && (
          <div className={style["error-message"]}>
            <p>{errorMessage.title}</p>
            <span>{errorMessage.message}</span>
          </div>
        )}
        <Formik
          initialValues={{
            name: "",
            cuisine: "other",
            type: "other",
            "time-required": "",
            ingredients: [
              {
                ingredient: "",
                quantity: "",
              }
            ],
            steps: "",
          }}
          validate={(values) => {
            try {
              validateYupSchema(values, Yup.object({
                name: Yup.string()
                  .max(32, "Name is too long! Allowed 32 character or less.")
                  .required("This field is required."),
                "time-required": Yup.number()
                  .min(1, "Time must be greater than 0!")
                  .max(2880, "Preparation should not exceed 2 days.")
                  .integer("This value must be an integer.")
                  .required("This field is required."),
                ingredients: Yup.array().when('$step', {
                  is: 1,
                  then: (schema) => schema.required(
                    "This field is required."
                  )
                }),
                steps: Yup.string().when('$step', {
                  is: 2,
                  then: (schema) => schema.required(
                    "This field is required."
                  )
                }),

          }), true, {step: formCtx.step})
            } catch (error) {
              return yupToFormErrors(error);
            }
            return {};
          }}
          onSubmit={async (values, helpers) => {
            if (finalStep) {
              fetcher.submit(values, {method: "post", action: "/recipes"});
              return;
            }
            formCtx.nextStep();
          }
        }
        >{props => (
          <Form key={formCtx.step} className={style["create-recipe-form"]}>
            {formCtx.step === 0 && <RecipeAboutForm/>}
            {formCtx.step === 1 && <RecipeIngredientsForm values={props.values}/>}
            {formCtx.step === 2 && <RecipeStepsForm/>}
            <div className={style["actions"]}>
              {
                formCtx.step !== 0 &&
                <Button
                  type="button"
                  onClick={formCtx.prevStep}
                >Back</Button>
              }
              <Button
                type="submit"
                cta={finalStep}
              >{finalStep ? "Submit" : "Next"}</Button>
            </div>
          </Form>
        )}
        </Formik>
      </div>
    </Modal>
  );
};
