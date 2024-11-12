import {createContext, useState} from "react";


export const RecipeMultiFormContext = createContext({
  step: 0,
  goToIndex: () => {},
  prevStep: () => {},
  nextStep: () => {},
});

export default function RecipeMultiFormProvider({children}) {
  const [step, setStep] = useState(0);

  function goToIndex(index) {
    setStep(index);
  }

  function prevStep() {
    setStep(prevState => prevState - 1);
  }

  function nextStep() {
    setStep(prevState => prevState + 1);
  }

  const ctxItems = {
    step,
    goToIndex,
    prevStep,
    nextStep,
  };

  return (
    <RecipeMultiFormContext.Provider value={ctxItems}>
      {children}
    </RecipeMultiFormContext.Provider>
  );
};
