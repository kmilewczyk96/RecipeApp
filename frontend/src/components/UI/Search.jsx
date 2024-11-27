import style from "./Search.module.css";

import {Field, Form, Formik} from "formik";
import {useSearchParams} from "react-router-dom";


export default function Search({fieldName, placeholder, onSubmit}) {
  const [searchParams] = useSearchParams();
  let initialValues = {};
  initialValues[fieldName] = searchParams?.get(fieldName) || "";

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => onSubmit(values[fieldName])}
    >
      <Form className={style["wrapper"]}>
        <Field id={fieldName} name={fieldName} placeholder={placeholder} className={style["search-input"]}/>
        <button className={style["search-button"]}>Search</button>
      </Form>
    </Formik>
  );
};
