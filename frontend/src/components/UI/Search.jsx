import style from "./Search.module.css";

import {Field, Form, Formik} from "formik";
import {useSearchParams} from "react-router-dom";


export default function Search({fieldName, placeholder, onSubmit}) {
  const [searchParams] = useSearchParams();
  let initialValues = {};
  initialValues[fieldName] = searchParams?.get(fieldName) || "";

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={async (values) => onSubmit(values[fieldName])}
    >
      <Form className={style["wrapper"]}>
        <Field id={fieldName} name={fieldName} placeholder={placeholder} className={style["search-input"]}/>
        <button type={"submit"} className={style["search-button"]}>Search</button>
      </Form>
    </Formik>
  );
};
