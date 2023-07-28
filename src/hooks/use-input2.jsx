import { useState } from "react";

const useInput2 = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [valueIsTouched, setValueIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && valueIsTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setValueIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setValueIsTouched(false);
  };

  return [
    enteredValue,
    valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  ];
};

export default useInput2;
