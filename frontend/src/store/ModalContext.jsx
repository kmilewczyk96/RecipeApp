import {createContext, useState} from "react";


export const ModalContext = createContext({
  content: <></>,
  setModalChildren: () => {},
  clear: () => {},
});


export default function ModalContextProvider({children}) {
  const [content, setContent] = useState(null);

  function setModalChildren(reactNode) {
    setContent(reactNode);
  }

  function clear() {
    setContent(null);
  }

  const ctxItems = {
    content,
    setModalChildren,
    clear,
  };

  return (
    <ModalContext.Provider value={ctxItems}>
      {children}
    </ModalContext.Provider>
  );
};
