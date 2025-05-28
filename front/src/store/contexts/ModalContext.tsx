import {
  createContext,
  useState
} from "react";
import type {ReactElement} from "react";


interface IProps {
  children: ReactElement,
}

export interface IModal {
  content: ReactElement | null,
  setModalChildren: (reactElement: ReactElement) => void,
  clear: () => void,
}

const ModalContext = createContext<IModal | undefined>(undefined);

export function ModalContextProvider({children}: IProps): ReactElement {
  const [content, setContent] = useState<ReactElement | null>(null);

  function setModalChildren(reactElement: ReactElement): void {
    setContent(reactElement);
  }

  function clear(): void {
    setContent(null);
  }

  const ctxItems = {
    content,
    setModalChildren,
    clear,
  }

  return (
    <ModalContext.Provider value={ctxItems}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
