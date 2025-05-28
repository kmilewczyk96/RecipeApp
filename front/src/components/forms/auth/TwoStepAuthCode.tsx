import { Form, Formik } from "formik";
import {
  useRef
} from "react";

import styles from "./TwoStepAuthCode.module.css";

import type {FormikErrors, FormikValues} from "formik";
import type {ChangeEvent, KeyboardEvent, ReactElement} from "react";

import validationErrorMessages from "@/components/forms/validation-schemas/validationErrorMessages";
import Button from "@/components/UI/Button";
import SingleCharInput from "@/components/UI/SingleCharInput";


interface IProps {
  length?: number,
  title?: string,
  email?: string,
}

export default function TwoStepAuthCode(
  {
    length=6,
    title="Authentication",
    email="test@example.com"
  }: IProps): ReactElement {
  const initialValues = Object.fromEntries(
    Array.from({length}, (_, index): [string, string] => [`input--${index}`, ""])
  );
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>, index: number): void {
    // Handling moving caret on Input Field changes.
    if (e.target.value === "") {
      return;
    }
    if (index < length - 1) {
      codeRefs.current[index + 1]?.select();
      return;
    }

    confirmRef.current?.focus();
    return;
  }

  function handleClick(index: number): void {
    // Prevents caret movement on mouse click.
    codeRefs.current[index]?.select();
  }

  function handleKeydown(e: KeyboardEvent<HTMLInputElement>, index: number): void {
    if (!codeRefs.current[index]?.name) {
      return;
    }
    switch (e.key) {
      case "ArrowLeft":
        // Changes to Shift + Tab behaviour if index > 0.
        e.preventDefault();
        if (index > 0) {
          codeRefs.current[index - 1]?.select();
        }
        return;

      case "ArrowRight":
        // Changes to Tab behaviour if index is not last input.
        e.preventDefault();
        if (index < length - 1) {
          codeRefs.current[index + 1]?.select();
        }
        return;

      case "Backspace":
        // Changes to Shift + Tab behaviour if current index is an empty input.
        if (index > 0 && codeRefs.current[index]?.value === "") {
          e.preventDefault();
          codeRefs.current[index - 1]?.select();
        }
        return;

      case codeRefs.current[index]?.value:
        // Pushes caret to next input when User re-enters value and thus not trigger onChange function.
        e.preventDefault();
        if (index < length - 1) {
          codeRefs.current[index + 1]?.select();
          return;
        }
        confirmRef.current?.focus();
        return;

      case "Home":
      case "End":
      case "PageUp":
      case "PageDown":
      case "ArrowUp":
      case "ArrowDown":
        // Prevents caret movement on keyboard strokes.
        e.preventDefault();
        return;
    }
  }

  function handleValidation(values: FormikValues): FormikErrors<any> {
    const errors: {[k: string]: string} = {};
    Object.keys(values).forEach(key => {
      if (!values[key]) {
        errors[key] = validationErrorMessages.required;
      }
    });

    return errors;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <h3>{title}</h3>
        <p>
          Please enter authentication code that we've sent to:<br/>
          {email && <u>{email}</u>}
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validate={(values) => handleValidation(values)}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className={styles.formWrapper}>
          <div className={styles.codeWrapper}>
            <div className={styles.inputs}>
              {
                Object.keys(initialValues).map((key: string, index: number) => (
                  <SingleCharInput
                    tabIndex={index + 1}
                    ref={inputEl => {
                      if (inputEl) {
                        codeRefs.current[index] = inputEl;
                      }
                    }}
                    onKeyDown={e => handleKeydown(e, index)}
                    onClick={() => handleClick(index)}
                    onChange={(e) => {handleChange(e, index)}}
                    key={index}
                    name={key}
                  />
                ))
              }
            </div>
            <Button
              type={"button"}
              tabIndex={0}
              className={styles.resendCodeBtn}
              buttonType={"tertiary"}
              colorTheme={"secondary"}
            >resend code
            </Button>
          </div>
          <div className={styles.actions}>
            <Button ref={confirmRef} tabIndex={length} type={"submit"} buttonType={"primary"}>Confirm</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}