import style from "./RecipeFilterForm.module.css";

import {Field, Form, Formik} from "formik";

import useModal from "/src/hooks/useModal.jsx";


export default function RecipeFilterForm() {
  const {clear} = useModal();

  return (
    <Formik
      initialValues={{
        origin: [],
        type: [],
        time: [],
        calories: [],
        tags: [],

      }}
      onSubmit={() => {clear()}}
    >
      <Form className={style["recipe-filter-form"]}>
        <div className={style["expandable-group-wrapper"]}>
          <input type={"checkbox"} id={style["expandable-origin-filter"]} className={style["expandable"]}/>
          <label htmlFor={style["expandable-origin-filter"]}>
            <div className={style["fake-button"]}>
              <p>Origin</p><p>&#8595;</p>
            </div>
          </label>
          <div role="group" className={style["expandable-div"]}>
            <label>
              <Field type="checkbox" name="origin" value="european"/>European
            </label>
            <label>
              <Field type="checkbox" name="origin" value="asian"/>Asian
            </label>
          </div>
        </div>
        <div className={style["expandable-group-wrapper"]}>
          <input type={"checkbox"} id={style["expandable-type-filter"]} className={style["expandable"]}/>
          <label htmlFor={style["expandable-type-filter"]}>
            <div className={style["fake-button"]}>
              <p>Type</p><p>&#8595;</p>
            </div>
          </label>
          <div role="group" className={style["expandable-div"]}>
            <label>
              <Field type="checkbox" name="type" value="main"/>Main
            </label>
            <label>
              <Field type="checkbox" name="type" value="soup"/>Soup
            </label>
          </div>
        </div>
        <div className={style["expandable-group-wrapper"]}>
          <input type={"checkbox"} id={style["expandable-time-filter"]} className={style["expandable"]}/>
          <label htmlFor={style["expandable-time-filter"]}>
            <div className={style["fake-button"]}>
              <p>Time</p><p>&#8595;</p>
            </div>
          </label>
        </div>
        <div className={style["expandable-group-wrapper"]}>
          <input type={"checkbox"} id={style["expandable-calories-filter"]} className={style["expandable"]}/>
          <label htmlFor={style["expandable-calories-filter"]}>
            <div className={style["fake-button"]}>
              <p>Calories</p><p>&#8595;</p>
            </div>
          </label>
        </div>
        <div className={style["expandable-group-wrapper"]}>
          <input type={"checkbox"} id={style["expandable-tags-filter"]} className={style["expandable"]}/>
          <label htmlFor={style["expandable-tags-filter"]}>
            <div className={style["fake-button"]}>
              <p>Tags</p><p>&#8595;</p>
            </div>
          </label>
          <div role="group" className={style["expandable-div"]}>
            <label>
              <Field type="checkbox" name="tag" value="vegan"/>Vegan
            </label>
            <label>
              <Field type="checkbox" name="tag" value="vegetarian"/>Vegetarian
            </label>
          </div>
        </div>
      </Form>
    </Formik>
  )
}