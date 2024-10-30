import style from "./Form.module.css";

import {Formik, Form} from "formik";
import {useContext, useEffect} from "react";
import {useFetcher, useSubmit} from "react-router-dom";
import * as Yup from "yup";

import Button from "../UI/Button.jsx";
import CustomInput from "../UI/CustomInput.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";
import Modal from "../UI/Modal.jsx";
import {ModalContext} from "../../store/ModalContext.jsx";


export default function CreateRecipeForm() {
  const submit = useSubmit();
  const fetcher = useFetcher();
  const {data, state} = fetcher;
  const {mode, hide} = useContext(ModalContext);
  let errorMessage;

  useEffect(() => {
    if (state === "idle" && data) {
      hide();
    }
  }, [data, state]);

  return (
    <Modal isOpen={mode === "create-recipe-form"} onClose={hide}>
      <div className={style["form-wrapper"]}>
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
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(32, "Name is too long! Allowed 32 character or less.")
              .required("This field is required."),
            "time-required": Yup.number()
              .min(1, "Time must be greater than 0!")
              .max(2880, "Preparation should not exceed 2 days.")
              .required("This field is required.")
          })}
          onSubmit={async (values) => {
            submit(values, {method: "post", action: "/recipes"});
          }}
        >
          <Form>
            <div className={style["inputs"]}>
              <CustomInput label="Name:" name="name" type="text"/>
              <CustomSelect label="Cuisine:" name="cuisine" defaultValue="other">
                <option value="american">American</option>
                <option value="chinese">Chinese</option>
                <option value="french">French</option>
                <option value="greek">Greek</option>
                <option value="indian">Indian</option>
                <option value="italian">Italian</option>
                <option value="japanese">Japanese</option>
                <option value="lebanese">Lebanese</option>
                <option value="mexican">Mexican</option>
                <option value="thai">Thai</option>
                <option value="turkish">Turkish</option>
                <option value="vietnamese">Vietnamese</option>
                <option value="other">Other</option>
              </CustomSelect>
              <CustomSelect label="Type:" name="type" defaultValue="other">
                <option value="cold_beverage">Cold beverage</option>
                <option value="dessert">Dessert</option>
                <option value="hot_beverage">Hot beverage</option>
                <option value="main">Main</option>
                <option value="snack">Snack</option>
                <option value="soup">Soup</option>
                <option value="other">Other</option>
              </CustomSelect>
              <CustomInput label="Time required:" name="time-required" type="number" min={1} max={2880}/>
            </div>
            <div className={style["actions"]}>
              <Button cta>Submit</Button>
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
};
