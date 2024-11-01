import {createContext, useState} from "react";


export const RecipeMultiFormContext = createContext({
  step: 0,
  prevStep: () => {},
  nextStep: () => {},
});

export default function RecipeMultiFormProvider({children}) {
  const [step, setStep] = useState(0);

  function prevStep() {
    setStep(prevState => prevState - 1);
  }

  function nextStep() {
    setStep(prevState => prevState + 1);
  }

  const ctxItems = {
    step,
    prevStep,
    nextStep,
  };

  return (
    <RecipeMultiFormContext.Provider value={ctxItems}>
      {children}
    </RecipeMultiFormContext.Provider>
  );
};
