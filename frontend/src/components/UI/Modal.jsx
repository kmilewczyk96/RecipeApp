import style from "./Modal.module.css";

import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";


export default function Modal({children, isOpen, onClose, className=""}) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (isOpen) {
      modal.showModal();
    }
    return () => {
      modal.close();
    };
  }, [isOpen]);

  return (
    createPortal((
      <dialog
        ref={dialog}
        className={`${style["modal"]} ${className}`}
        onClose={onClose}
      >{children}
      </dialog>
    ), document.getElementById("modal"))
  );
};
