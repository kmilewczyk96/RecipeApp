import { useEffect, useRef } from "react";

import styles from "./Modal.module.css";

import type {ReactElement, RefObject} from "react";

import useModal from "@/hooks/useModal";


export default function Modal(): ReactElement {
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
    <dialog
      id={"modal"}
      ref={dialog}
      onClose={clear}
      className={styles.wrapper}
    >
      {content}
    </dialog>
  );
}