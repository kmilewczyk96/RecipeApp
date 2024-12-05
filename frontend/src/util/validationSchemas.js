import * as Yup from "yup";

export const recipeValidationSchema = Yup.object().shape({
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
    then: schema => schema
      .min(1, "At least one ingredient required.")
      .of(Yup.object().shape({
        ingredient: Yup.object().shape({
          id: Yup.string().required("Please select ingredient or delete this entry.")
        }),
        quantity: Yup.number()
          .integer("This value must be an integer.")
          .required("Quantity value can not be blank."),
        quantityAlt: Yup.number()
          .min(0.1, "Alt quantity value must be greater than 0.1!")
        }),
      )
  }),
  steps: Yup.array().when('$step', {
    is: 2,
    then: schema => schema
      .min(1, "At least one step required.")
      .of(Yup.object().shape({
        value: Yup.string()
          .min(1, "Step can not be blank.")
          .required("Step can not be blank.")
      }))
  })
});
