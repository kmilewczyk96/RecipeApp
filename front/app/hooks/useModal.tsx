import {useContext} from "react";

import ModalContext, {type IModal} from "~/store/contexts/ModalContext";


export default function useModal(): IModal {
  const modal: IModal | undefined = useContext(ModalContext);
  if (modal === undefined) {
    throw new Error("Seems like there is no context provider!");
  }

  return modal;
};
