import styles from "./TwoStepAuthCode.module.css";

import {
  type KeyboardEvent,
  type ReactElement,
  useRef,
} from "react";
import {Form, Formik, type FormikErrors} from "formik";

import SingleCharInput from "~/UI/SingleCharInput";
import Button from "~/UI/Button";


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
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  async function handleKeydown(
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<{[k: string]: string}>>
  ): Promise<void> {
    if (!codeRefs.current[index]?.name) {
      return;
    }
    if (e.key === "Backspace" && index > 0 && codeRefs.current[index]?.value === "") {
      e.preventDefault();
      codeRefs.current[index - 1]?.focus();
    } else if ((e.key === "Backspace" || e.key === "Delete") && codeRefs.current[index]?.value) {
      await setFieldValue(codeRefs.current[index]?.name, "");
    } else if (/^\d$/.test(e.key)) {
      e.preventDefault();
      await setFieldValue(codeRefs.current[index]?.name, e.key);
      if (index < length - 1) {
        codeRefs.current[index + 1]?.focus();
      }
    }
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
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({setFieldValue}) => (
          <Form className={styles.formWrapper}>
            <div className={styles.codeWrapper}>
              <div className={styles.inputs}>
                {
                  Object.keys(initialValues).map((key: string, index: number) => (
                    <SingleCharInput
                      autoFocus={true}
                      tabIndex={index + 1}
                      ref={inputEl => {
                        if (inputEl) {
                          codeRefs.current[index] = inputEl;
                        }
                      }}
                      onKeyDown={e => handleKeydown(e, index, setFieldValue)}
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
              <Button tabIndex={length} type={"submit"} buttonType={"primary"}>Confirm</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}