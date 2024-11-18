import style from "./RecipeForm.module.css";

import {Formik, Form, validateYupSchema, yupToFormErrors} from "formik";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

import Button, {buttonTypeClasses} from "../UI/Button.jsx";
import RecipeAboutForm from "./RecipeAboutForm.jsx";
import RecipeIngredientsForm from "./RecipeIngredientsForm.jsx";
import RecipeStepsForm from "./RecipeStepsForm.jsx";
import queryClient, {fetchRecipeFormHelpers, sendRecipeFormData} from "../../util/http.js";
import {recipeValidationSchema} from "../../util/validationSchemas.js";
import FormProgress from "../UI/FormProgress.jsx";


export default function RecipeForm({initialData=null}) {
  const [step, setStep] = useState(0);
  const location = useLocation();
  const navi = useNavigate();
  const {data: formHelpers, isLoading} = useQuery({
    queryKey: ["formHelpers"],
    queryFn: fetchRecipeFormHelpers,
  });

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: sendRecipeFormData,
    onSuccess: () => {
      navi(location);
      hide();
    }
  });

  async function handleSubmit(formValues) {
    mutate(formValues);
    await queryClient.invalidateQueries({queryKey: ["recipes", {userID: "me"}]});
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
              }
            ],
            steps: initialData?.steps || [
              "",
            ],
          }}
          validate={(values) => {
            try {
              validateYupSchema(values, recipeValidationSchema, true, {step})
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
                steps: values["steps"],
              }
              await handleSubmit(data);
              helpers.resetForm();
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
            {step === 2 && <RecipeStepsForm/>}
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
