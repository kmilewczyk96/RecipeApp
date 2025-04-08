import styles from "./TwoStepAuthCode.module.css";

import {
  type ChangeEvent,
  type KeyboardEvent,
  type ReactElement,
  useRef,
} from "react";
import {Form, Formik} from "formik";

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

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const {value} = e.target;
    const index = Number(e.target.name.split("--")[1]);

    if (value.length === 1) {
      if (index < length - 1) {
        codeRefs.current[index + 1]?.select();
      }
    } else if (value.length === 0 && index > 0) {
      codeRefs.current[index - 1]?.select();
    }
  }

  function handleEmptyValueBackspace(e: KeyboardEvent<HTMLInputElement>, index: number): void {
    if (e.key === "Backspace" && e.currentTarget.value.length === 0) {
      e.preventDefault();
      codeRefs.current[index - 1]?.select();
    }
    if (e.key === e.currentTarget.value) {
      e.preventDefault();
      codeRefs.current[index + 1]?.select();
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
        onSubmit={() => {}}
      >
        <Form className={styles.formWrapper}>
          <div className={styles.codeWrapper}>
            <div className={styles.inputs}>
              {
                // TODO: fix that annoying ref warning.
                Object.keys(initialValues).map((key: string, index: number) => (
                  <SingleCharInput
                    inputMode={"numeric"}
                    tabIndex={index + 1}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={e => handleEmptyValueBackspace(e, index)}
                    ref={el => codeRefs.current[index] = el}
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
      </Formik>
    </div>
  );
}