import style from "./Form.module.css";

import {useContext, useEffect} from "react";
import {Form, useActionData, useFetcher} from "react-router-dom";

import Button from "../UI/Button.jsx";
import CustomInput from "../UI/CustomInput.jsx";
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
            <CustomInput id="time-required" type="number" label="Time required:" required/>
            <CustomInput id="description" type="text" label="Description:" textArea rows="8"/>
          </div>
          <div className={style["actions"]}>
            <Button cta>Submit</Button>
          </div>
        </fetcher.Form>
      </div>
    </Modal>
  );
};

