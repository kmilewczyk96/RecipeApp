import style from "./Modal.module.css";

import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import useModal from "../../hooks/useModal.jsx";


export default function Modal() {
  const dialog = useRef();
  const {content, clear} = useModal();

  useEffect(() => {
    console.log("triggered");
    const modal = dialog.current;

    if (content) {
      document.body.style.overflow = "hidden";
      modal.showModal();
    }
    return () => {
      document.body.style.overflow = "unset";
      modal.close();
    };
  }, [content]);

  return (
    createPortal((
      <dialog
        ref={dialog}
        className={style["modal"]}
        onClose={clear}
      >
        {content}
      </dialog>
    ), document.getElementById("modal"))
  );
};
