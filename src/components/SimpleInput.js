import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const { value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandeler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput } = useInput(value => value.trim() !== '')

  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //Validation via Regex(found on google)
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandeler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput((value) => value.match(emailFormat))

  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }

  const formSubmissionHandler = e => {
    e.preventDefault()

    if (!enteredNameIsValid) {
      return
    }
    console.log(enteredName);

    // nameInputRef.current.value = '' NOT IDEAL, DONT MANIPULATE THE DOM
    resetNameInput()

    resetEmailInput()
  }

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control'
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input onBlur={nameBlurHandler} type='text' id='name' onChange={nameChangedHandler} value={enteredName} />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-mail</label>
        <input onBlur={emailBlurHandler} type='email' id='email' onChange={emailChangedHandler} value={enteredEmail} />
        {emailInputHasError && <p className="error-text">Please enter a valid email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
