import style from "./ModalConfirmation.module.css";

import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

import Button, {buttonTypeClasses} from "./Button.jsx";
import useModal from "../../hooks/useModal.jsx";
import queryClient from "../../util/http.js";


export default function ModalConfirmation(
  {
    title="Are you sure?",
    text,
    onSubmitFn,
  }) {
  const {clear} = useModal()
  const navi = useNavigate();

  const {mutate} = useMutation({
    mutationFn: () => onSubmitFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["recipes"], refetchType: "none"});
      clear();
      navi("/my-profile");
    }
  })

  return (
    <div className={style["confirmation-dialog-wrapper"]}>
      <h3 className={style["confirmation-title"]}>{title}</h3>
      <p className={style["confirmation-text"]}>{text}</p>
      <div className={style["confirmation-actions"]}>
        <Button
          onClick={clear}
        >No
        </Button>
        <Button
          typeClass={buttonTypeClasses.delete}
          onClick={mutate}
        >Proceed
        </Button>
      </div>
    </div>
  )
}