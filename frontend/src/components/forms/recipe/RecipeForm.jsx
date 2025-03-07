import style from "./RecipeForm.module.css";

import {Formik, Form, validateYupSchema, yupToFormErrors} from "formik";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {v4 as uuid4} from "uuid";

import Button, {buttonTypeClasses} from "/src/components/UI/Button.jsx";
import RecipeAboutForm from "./RecipeAboutForm.jsx";
import RecipeIngredientsForm from "./RecipeIngredientsForm.jsx";
import RecipeStepsForm from "./RecipeStepsForm.jsx";
import {dropKeys, generateKeys} from "/src/util/converters.js";
import queryClient, {fetchRecipeFormHelpers, sendRecipeFormData, sendRecipeUpdateFormData} from "/src/util/http.js";
import {recipeValidationSchema} from "/src/util/validationSchemas.js";
import FormProgress from "/src/components/UI/FormProgress.jsx";
import useModal from "/src/hooks/useModal.jsx";
import useNotification from "/src/hooks/useNotification.jsx";


export default function RecipeForm({initialData=null}) {
  const {clear} = useModal();
  const {showNotification} = useNotification();
  const [step, setStep] = useState(0);
  const location = useLocation();
  const navi = useNavigate();
  const {data: formHelpers, isLoading} = useQuery({
    queryKey: ["formHelpers"],
    queryFn: fetchRecipeFormHelpers,
  });

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: initialData ? sendRecipeUpdateFormData : sendRecipeFormData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["recipes"]});
      navi(location);
      clear();
      showNotification(
        "success",
        initialData ? "Your recipe has been updated successfully" : "Your recipe has been created successfully!"
      );
    }
  });

  function handleSubmit(formValues) {
    if (initialData) {
      mutate({formValues, recipeID: initialData.id});
    } else {
      mutate(formValues);
    }
  }

  let errorMessage;
  return (
    <>
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
            ingredients: initialData?.r_ingredients || [
              {
                ingredient: {
                  id: "",
                },
                quantity: "",
                quantityAlt: "",
              }
            ],
            steps: initialData?.steps ? generateKeys(initialData.steps) : [{id: uuid4(), value: ""}]
          }}
          validate={async (values) => {
            try {
              await validateYupSchema(values, recipeValidationSchema, true, {step})
            } catch (error) {
              return yupToFormErrors(error);
            }
            return {};
          }}
          onSubmit={async (values, helpers) => {
            if (step === 2) {
              const data = {
                name: values["name"],
                cuisine: values["cuisine"],
                recipe_type: values["type"],
                time_minutes: values["time-required"],
                r_ingredients: values["ingredients"],
                steps: dropKeys(values["steps"]),
              }
              await handleSubmit(data);
              return;
            }
            setStep(prevState => prevState + 1);
          }
          }
        >
          <Form action={"/recipes"} key={step} className={style["create-recipe-form"]}>
            <FormProgress
              currentStep={step}
              steps={["About", "Ingredients", "Steps"]}
            />
            {step === 0 && <RecipeAboutForm
              cuisineChoices={formHelpers.cuisine_choices}
              typeChoices={formHelpers.type_choices}
            />}
            {step === 1 && <RecipeIngredientsForm
              ingredients={formHelpers.ingredients}
            />}
            {step === 2 && <RecipeStepsForm autoFocusFirst={initialData === null}/>}
            <div className={style["actions"]}>
              {
                step !== 0 &&
                <Button
                  type="button"
                  onClick={() => setStep(prevState => prevState - 1)}
                >Back</Button>
              }
              <Button
                type="submit"
                typeClass={step === 2 ? buttonTypeClasses.submit : buttonTypeClasses.regular}
              >{step === 2 ? "Submit" : "Next"}</Button>
            </div>
          </Form>
        </Formik>
      </div>}
    </>
  );
};
