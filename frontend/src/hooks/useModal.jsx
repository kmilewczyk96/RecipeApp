import {useContext} from "react";

import {ModalContext} from "../store/ModalContext.jsx";


export default function useModal() {
  return useContext(ModalContext);
};
