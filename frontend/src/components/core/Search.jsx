import style from "./styles/Search.module.css";

import {Form, Formik, useField} from "formik";

import FormikInput from "./FormikInput.jsx";
import IconButton from "../icons/wrappers/IconButton.jsx";
import {RemoveRPath, SearchRPath} from "../icons/svg-paths/Regular.jsx";


export default function Search({name, placeholder, onSubmit, iconSize = "24"}) {
  return (
    <Formik
      initialValues={{name: ""}}
      onSubmit={async (values) => onSubmit(values[name])}
    >
      {({handleSubmit, handleReset, values}) => (
        <Form className={style.searchWrapper}>
          <FormikInput
            id={name}
            name={name}
            placeholder={placeholder}
          />
          <div className={style.searchActions}>
            {values["name"] !== "" && <IconButton
              size={iconSize}
              onClick={() => {
                handleReset();
                document.getElementById(name)?.focus();
              }
              }
            >
              <RemoveRPath/>
            </IconButton>}
            <IconButton
              size={iconSize}
              onClick={handleSubmit}
            >
              <SearchRPath/>
            </IconButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
