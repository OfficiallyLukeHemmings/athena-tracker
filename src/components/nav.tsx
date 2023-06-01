import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
function Nav() {

  function handleSignout() {
    signOut(auth);
  }

  return (
    <nav className="flex justify-between items-center sticky top-0 px-2 py-3 mb-6 w-full bg-white border-b-2 border-b-gray-200 drop-shadow-md z-10">
      <div className="relative inline-block px-1">
        <Link to={"/"}><h1 className="text-pink-700 hover:text-gray-700 px-1 text-4xl md:text-5xl font-bold transition-color duration-300 ease-in-out select-none">Athena</h1></Link>
      </div>
      <div className="inline-block">
        <button onClick={handleSignout} className="py-1 px-1 mx-2 text-lg text-pink-700 hover:text-gray-700 transition-color duration-300 ease-in-out">Sign Out</button>
      </div>
    </nav>
  );
}

export default Nav;
