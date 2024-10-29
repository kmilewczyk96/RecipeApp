import style from "./Form.module.css";

import {useContext, useEffect} from "react";
import {Form, useActionData, useFetcher} from "react-router-dom";

import Button from "../UI/Button.jsx";
import CustomInput from "../UI/CustomInput.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";
import Modal from "../UI/Modal.jsx";
import {ModalContext} from "../../store/ModalContext.jsx";


export default function CreateRecipeForm() {
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
        <fetcher.Form method="post" action={"/recipes"}>
          <div className={style["inputs"]}>
            <CustomInput id="name" type="text" label="Name:" required/>
            <CustomSelect id="cuisine" label="Cuisine:" required defaultValue="other">
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
            <CustomSelect id="type" label="Type:" required defaultValue="other">
              <option value="cold_beverage">Cold beverage</option>
              <option value="dessert">Dessert</option>
              <option value="hot_beverage">Hot beverage</option>
              <option value="main">Main</option>
              <option value="snack">Snack</option>
              <option value="soup">Soup</option>
              <option value="other">Other</option>
            </CustomSelect>
            <CustomInput id="time-required" type="number" label="Time required:" required/>
          </div>
          <div className={style["actions"]}>
            <Button cta>Submit</Button>
          </div>
        </fetcher.Form>
      </div>
    </Modal>
  );
};
