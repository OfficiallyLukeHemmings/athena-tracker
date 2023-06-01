import { onAuthStateChanged } from "firebase/auth";
import LoginForm from "../components/loginForm";
import { auth } from "../firebase";

function LoginPage() {

  // Preventing signed in users from accessing login page 
  // (unnecessary and bad experience).
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log("signed in");
      window.location.replace("/");
    }
  });

  return ( 
  <div className="flex flex-col md:flex md:flex-row my-auto md:my-0 justify-center items-center h-screen text-base md:text-lg">
    <div className="max-w-md text-center px-10 py-4 border-b-2 md:border-b-0 md:border-r-2 border-pink-700">
      <h2 className="max-w-3xl mx-auto text-5xl md:text-7xl font-bold text-pink-700 text-center mb-4">Athena</h2>
      <p className="">A single-page web application for tracking and anaylsing win/loss data in real time.</p>
      <br className="hidden md:block" /> <br className="hidden md:block" /> <br />
      <p className="pb-8 italic text-pink-700 opacity-80 text-sm md:text-base lg:text-lg">Created using TypeScript, React, React Router, TailwindCSS, Chart.js and Firebase.</p>
    </div>
    <LoginForm className={"mt-12 md:mt-0 mx-12 min-w-xl max-w-xl flex flex-col"}/>
  </div>
   );
}

export default LoginPage;