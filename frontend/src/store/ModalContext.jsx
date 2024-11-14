import {createContext, useState} from "react";


export const ModalContext = createContext({
  mode: "",
  showRecipeForm: () => {},
  hide: () => {},
});


export default function ModalContextProvider({children}) {
  const [mode, setMode] = useState("");

  function showRecipeForm() {
    setMode("recipe-form");
  }

  function hide() {
    setMode("");
  }

  const ctxItems = {
    mode,
    showRecipeForm,
    hide,
  };

  return (
    <ModalContext.Provider value={ctxItems}>
      {children}
    </ModalContext.Provider>
  );
};
