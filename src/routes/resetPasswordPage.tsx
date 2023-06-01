import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function ResetPasswordPage() {
  //https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email

  async function handleClick() {
    const emailEl = document.getElementById("email") as HTMLInputElement;
    const email = emailEl.value;
    
    if(!email) {
      emailEl.placeholder = "Please enter your email"
      return
    }

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        window.location.replace("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

      
  }


  return (
    <div>
      <h1>Reset Password</h1>
      <div className="">
        <label htmlFor="email">Please enter your email:</label>
        <input type="email" id="email" name="email" />
        <button onClick={handleClick}>Send Password Reset Email</button>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
