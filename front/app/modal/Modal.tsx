import styles from "./Modal.module.css";

import {type ReactPortal, type RefObject, useEffect, useRef} from "react";
import {createPortal} from "react-dom";

import useModal from "~/hooks/useModal";


export default function Modal(): ReactPortal {
  const dialog: RefObject<HTMLDialogElement | null> = useRef(null);
  const {content, clear} = useModal();

  useEffect((): () => void => {
    const modal: HTMLDialogElement | null = dialog.current;
    if (!modal) {return () => {}}
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
        onClose={clear}
        className={styles.wrapper}
      >
        {content}
      </dialog>
      ),
      // @ts-ignore
      document.getElementById("modal"))
  );
}