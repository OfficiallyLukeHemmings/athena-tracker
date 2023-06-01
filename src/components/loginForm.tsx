import { useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

function LoginForm({ className }) {
  const [error, setError] = useState("");

  function handleClick(e) {
    e.preventDefault();

    const form = document.getElementById("loginForm") as HTMLFormElement;
    if (!form) {
      throw new Error("Login form not found");
    }
    const email: string = form.email.value;
    const password: string = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
          // console.log("signed in:", user);
          window.location.replace("/");
          //TODO: Validation checks here for empty fields and throw error
      })
      .catch((err) => {
        /*TODO: Set error message appropriately given each error type:
        * Firebase: Error (auth/internal-error).
        * Firebase: Error (auth/wrong-password).
        * Firebase: Error (auth/user-not-found).
        * Firebase: Error (too-many-requests). (requires reset functionality?)
        * (no email entered) 
        * (no password entered)
        * (invalid email (regex(?)))
        */
        
        // console.log(err.message);
       
        switch (err.message) {
          case "Firebase: Error (auth/internal-error).":
            setError("Something has gone wrong with the authentication server. Please ensure your details are correct and try again, or come back later.");
            break;

          case "Firebase: Error (auth/wrong-password).":
            setError("Sorry, that password isn't right.");
            break;

          case "Firebase: Error (auth/invalid-email).":
            setError("Something seems to be wrong with the email entered.");
            break;

          case "Firebase: Error (auth/user-not-found).":
            setError("We couldn't find an account with that email, sorry!");
            break;

          case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
            setError("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
            break;

          case "Error (No email entered)":
            setError("Please enter your email.");
            break;

          case "Error (No password entered)":
            setError("Please enter your password.");
            break;
        
          default: // Something else has gone wrong?
            setError("Something unexpected has gone wrong."); 
            break;
        }
      });
  }

  return ( 
    <div className={className + " " + ""}>
      <form id="loginForm" className="flex flex-col relative w-full md:w-80">
        <hgroup className="flex flex-col">
          <h1 className="text-5xl md:text-6xl text-center md:text-left text-pink-700 opacity-80 mb-4 md:mb-2">Sign In</h1>
        </hgroup>
    
        <input type="text" name="email" id="email" placeholder="email" autoComplete="email" required
        className="p-1 w-full bg-gray-100 rounded-lg my-2 ring ring-white ring-offset-2 transition ease-in-out duration-300 hover:ring-pink-700"
        />
        <input type="password" name="password" id="password" placeholder="password" required
        className="p-1 w-full bg-gray-100 rounded-lg mt-2 ring ring-white ring-offset-2 transition ease-in-out duration-300 hover:ring-pink-700"
        />

        {error && (
          <div id="authErrorDiv absolute bottom-500 m-auto ">
            <p className="max-w-xs text-center text-md text-pink-700 pt-2 italic md:not-italic">{error}</p>
          </div>

        )}
        <button type="submit" onClick={(e) => { handleClick(e) }} className="px-16 md:px-8 py-3 md:py-1.5 m-auto mt-4 bg-pink-700 hover:ring-pink-700 text-white rounded-lg ring ring-white ring-offset-2 transition ease-in-out duration-300">Login</button>
      </form>
      <Link to="/Register" className="Link text-pink-700 mx-auto md:ml-auto mt-8">Register Instead?</Link>
    </div>
  );
}

export default LoginForm;