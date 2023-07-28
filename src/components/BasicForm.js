import useInput2 from "../hooks/use-input2";

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //Validation via Regex(found on google)

const emailValidation = value => value.match(emailFormat)
const isNotEmpty = value => value.trim() !== ''

const BasicForm = (props) => {
  const [
    enteredFirstName,
    firstNameIsValid,
    firstNameHasError,
    firstNameChangeHandler,
    firstNameBlurHandler,
    resetFirstName
  ] = useInput2(isNotEmpty)

  const [
    enteredSecondName,
    secondNameIsValid,
    secondNameHasError,
    secondNameChangeHandler,
    secondNameBlurHandler,
    resetSecondName,
  ] = useInput2(isNotEmpty)

  const [
    enteredEmail,
    emailIsValid,
    emailHasError,
    emailChangeHandler,
    emailBlurHandler,
    resetEmail
  ] = useInput2(emailValidation)

  let formIsValid = false

  if (firstNameIsValid && secondNameIsValid && emailIsValid) {
    formIsValid = true
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault()

    if (!formIsValid) {
      return
    }

    console.log('Submitted');
    console.log(enteredFirstName);
    console.log(enteredSecondName);
    console.log(enteredEmail);

    resetFirstName()
    resetSecondName()
    resetEmail()
  }

  const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control'
  const secondNameClasses = secondNameHasError ? 'form-control invalid' : 'form-control'
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='firstname'>First Name</label>
          <input type='text' id='firstname' value={enteredFirstName} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} />
          {firstNameHasError && <p className="error-text">First name can't be empty</p>}
        </div>
        <div className={secondNameClasses}>
          <label htmlFor='secondname'>Last Name</label>
          <input type='text' id='secondname' value={enteredSecondName} onChange={secondNameChangeHandler} onBlur={secondNameBlurHandler} />
          {secondNameHasError && <p className="error-text">Second name can't be empty</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input type='email' id='email' value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
        {emailHasError && <p className="error-text">Please put a valid email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
