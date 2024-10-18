import {createContext, useState} from "react";


export const ModalContext = createContext({
  mode: "",
  showCreateRecipeForm: () => {},
  hide: () => {},
});


export default function ModalContextProvider({children}) {
  const [mode, setMode] = useState("");

  function showCreateRecipeForm() {
    setMode("create-recipe-form");
  }

  function hide() {
    setMode("");
  }

  const ctxItems = {
    mode,
    showCreateRecipeForm,
    hide,
  };

  return (
    <ModalContext.Provider value={ctxItems}>
      {children}
    </ModalContext.Provider>
  );
};
