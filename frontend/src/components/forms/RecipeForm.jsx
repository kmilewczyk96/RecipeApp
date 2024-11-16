import style from "./RecipeForm.module.css";

import {Formik, Form, validateYupSchema, yupToFormErrors} from "formik";
import {useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import * as Yup from "yup";

import Button, {buttonTypeClasses} from "../UI/Button.jsx";
import Modal from "../UI/Modal.jsx";
import {ModalContext} from "../../store/ModalContext.jsx";
import useRecipeMultiForm from "../../hooks/useRecipeMultiForm.jsx";
import RecipeAboutForm from "./RecipeAboutForm.jsx";
import RecipeIngredientsForm from "./RecipeIngredientsForm.jsx";
import RecipeStepsForm from "./RecipeStepsForm.jsx";
import queryClient, {fetchRecipeFormHelpers, sendRecipeFormData} from "../../util/http.js";
import {recipeValidationSchema} from "../../util/validationSchemas.js";
import FormProgress from "../UI/FormProgress.jsx";


export default function RecipeForm(initialData) {
  const location = useLocation();
  const navi = useNavigate();
  const {data: formHelpers, isLoading} = useQuery({
    queryKey: ["formHelpers"],
    queryFn: fetchRecipeFormHelpers,
  });

  const {mode, hide} = useContext(ModalContext);
  const formCtx = useRecipeMultiForm();
  const finalStep = formCtx.step === 2;

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: sendRecipeFormData,
    onSuccess: () => {
      navi(location);
      formCtx.goToIndex(0);
      hide();
    }
  });

  async function handleSubmit(formValues) {
    mutate(formValues);
    await queryClient.invalidateQueries({queryKey: ["recipes", {userID: "me"}]});
  }

  let errorMessage;
  return (
    <Modal isOpen={mode === "recipe-form"} onClose={hide}>
      {formHelpers && <div className={style["modal-form-wrapper"]}>
        {errorMessage && (
          <div className={style["error-message"]}>
            <p>{errorMessage.title}</p>
            <span>{errorMessage.message}</span>
          </div>
        )}
        <Formik
          initialValues={{
            name: initialData?.name || "",
            cuisine: initialData?.cuisine || "other",
            type: initialData?.recipe_type || "other",
            "time-required": initialData?.time_minutes || "",
            ingredients: initialData?.ingredients || [
              {
                ingredient: {
                  id: "",
                },
                quantity: "",
              }
            ],
            steps: initialData?.steps || [
              "",
            ],
          }}
          validate={(values) => {
            try {
              validateYupSchema(values, recipeValidationSchema, true, {step: formCtx.step})
            } catch (error) {
              return yupToFormErrors(error);
            }
            return {};
          }}
          onSubmit={async (values, helpers) => {
            if (finalStep) {
              const data = {
                name: values["name"],
                cuisine: values["cuisine"],
                recipe_type: values["type"],
                time_minutes: values["time-required"],
                r_ingredients: values["ingredients"],
                steps: values["steps"],
              }
              await handleSubmit(data);
              helpers.resetForm();
              return;
            }
            formCtx.nextStep();
          }
          }
        >
          <Form action={"/recipes"} key={formCtx.step} className={style["create-recipe-form"]}>
            <FormProgress
              currentStep={formCtx.step}
              steps={["About", "Ingredients", "Steps"]}
            />
            {formCtx.step === 0 && <RecipeAboutForm
              cuisineChoices={formHelpers.cuisine_choices}
              typeChoices={formHelpers.type_choices}
            />}
            {formCtx.step === 1 && <RecipeIngredientsForm
              ingredients={formHelpers.ingredients}
            />}
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
                typeClass={finalStep ? buttonTypeClasses.submit : buttonTypeClasses.regular}
              >{finalStep ? "Submit" : "Next"}</Button>
            </div>
          </Form>
        </Formik>
      </div>}
    </Modal>
  );
};
