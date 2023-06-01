import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { passwordsMatch, validPassword } from "../passwordValidation";

function RegisterPage() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirecting authenticated users.
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log("signed in");
      window.location.replace("/");
    }
  });

  function handleClick(e) {
    e.preventDefault();
    
    // Getting form elements required for signup.
    const form = document.getElementById("signUpForm") as HTMLFormElement;
    if (!form) {
      throw new Error("Signup form not found");
    }
    const email = form.email.value;
    const password = form.password.value;
    const rePassword = form.rePassword.value;

    try {
      // Custom error checks.
      if (!email) {
        throw new Error("No email entered.");
      }
      if (!password) {
        throw new Error("No password entered.");
      }
      if (!rePassword) {
        throw new Error("No re-password.")
      }
      if (!passwordsMatch(password, rePassword)) {
        throw new Error("Passwords do not match.");
      }
      if (!validPassword(password)) {
        throw new Error("Password considered invalid.")
      }

      // Firebase Auth (and error handling).
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          // console.log(user);
        })
        .catch((err) => {
          // console.log(err.message);

          setIsError(true);

          /*TODO: Set error message appropriately given each error type:
           * Firebase: Password should be at least 6 characters (auth/weak-password).
           * ... This one should be inaccessible due to the 8 char min. custom check
           * Firebase: Error (auth/email-already-in-use).
           * Firebase: Error (auth/invalid-email). (i.e invalid email structure).
           * Firebase: Error (auth/internal-error).
           */
          switch (err.message) {
            case "Firebase: Error (auth/internal-error).":
              setErrorMessage(
                "Something has gone wrong with the authentication server. Please ensure your details are correct and try again, or come back later."
              );
              break;

            case "Firebase: Error (auth/invalid-email).":
              setErrorMessage(
                "Something seems to be wrong with the email entered."
              );
              break;

            case "Firebase: Error (auth/email-already-in-use).":
              setErrorMessage(
                "Email already in use."
              );
              break;

            default: //Something else has gone wrong?
              setErrorMessage("TODO: Something else has gone wrong.");
              break;
          }
        });

    }
    catch (err: any) {
      // console.log(err.message);

      setIsError(true);

      switch (err.message) {
        case "No email entered.":
          setErrorMessage("Please enter an email.");
          break;

        case "No password entered.":
          setErrorMessage("Please enter a password.");
          break;

        case "No re-password.":
          setErrorMessage("Please re-enter your password.");
          break;

        case "Passwords do not match.":
          setErrorMessage("Passwords do not match. Please check your password.");
          break;

        case "Password considered invalid.":
          setErrorMessage("Password considered invalid. Please ensure your password is at least 8 characters long, and has at least one uppercase character, a lowercase character, a number, and a special character (e.g. !, @).");
          break;

        default:
          setErrorMessage("TODO"); //Something else has gone wrong?
          break;
      }
    }
  }

  return ( 
    <>
      <main className="flex flex-col justify-center items-center h-screen m-auto">
        <hgroup>
          <h1 className="text-5xl md:text-6xl  text-pink-700 opacity-80 mb-4 md:mb-2 pb-4">Sign Up</h1>
        </hgroup>
        <form id="signUpForm" className="flex flex-col justify-center items-center w-2/3 md:w-2/5 lg:w-1/4">
          <label htmlFor="email" className="mr-auto">Email:</label>
          <input type="text" name="email" placeholder="Email" aria-label="email" autoComplete="email" required 
          className="w-full p-1 bg-gray-100 rounded-lg my-2 ring ring-white ring-offset-2 transition ease-in-out duration-300 hover:ring-pink-700"/>
          <label htmlFor="password" className="mr-auto mt-2">Password:</label>
          <input type="password" name="password" placeholder="Password" aria-label="Password" autoComplete="current-password" required 
          className="p-1 w-full bg-gray-100 rounded-lg my-2 ring ring-white ring-offset-2 transition ease-in-out duration-300 hover:ring-pink-700"/>
          <input type="password" name="rePassword" placeholder="Re-enter Password" aria-label="rePassword" required 
          className="p-1 w-full bg-gray-100 rounded-lg my-2 ring ring-white ring-offset-2 transition ease-in-out duration-300 hover:ring-pink-700"/>
          {isError && ( 
            <div className="authErrorDiv bottom-500 m-auto ">
              <p className="authErrorMsg max-w-sm text-center text-md text-pink-700 pt-2 ">{errorMessage}</p>
            </div>
          )}
          <button type="submit" className="contrast px-16 md:px-8 py-3 md:py-1.5 m-auto mt-4 bg-pink-700 hover:ring-pink-700 text-white rounded-lg ring ring-white ring-offset-2 transition ease-in-out duration-300" onClick={(e)=> {handleClick(e)}}>Sign Up</button>
        </form>
        <Link to="/login" className="Link text-pink-700 mt-12">Sign In Instead?</Link>
      </main>
    </>
   );
}

export default RegisterPage;
