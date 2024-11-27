import {useContext} from "react";

import {ModalContext} from "/src/store/ModalContext.jsx";


export default function useModal() {
  return useContext(ModalContext);
};
