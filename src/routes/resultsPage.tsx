import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { database as db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import CreateResultModal from "../components/createResultModal";
import ResultsTable from "../components/resultsTable";
import Nav from "../components/nav";
import { delAllResults } from "../database";


function ResultsPage() {
  const [results, setResults] = useState({});
  const [uid, setUid] = useState("");
  const [refresh, setRefresh] = useState(false);

  const params = useLoaderData();
  const gameName = (params as { game: string }).game;
  
  useEffect(() => {
    // Redirecting unauthenticated users.
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log("signed in as:", user);
        setUid(user.uid);
      } else {
        // console.log("signed out");
        window.location.replace("/login");
        setUid("");
      }
    });
    // If not authenticated...
    if (!auth) {
      // Redirect user to login page.
      window.location.replace("/login");
    }

    const resultsRef = ref(db, `${uid}/games/${gameName}/results`);
    onValue(resultsRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data = await snapshot.val();
        // const results = Object.keys(data);
        setResults(data);
      } else {
        // console.log("snapshot doesn't seem to exist");
      }
    });
  }, [gameName, uid]);

  function handleClick() {
    const modal = document.getElementsByClassName("create-modal")[0] as HTMLElement;
    modal.style.display = "inline";
  }
  
  function closeModal() {
    const modal = document.getElementsByClassName("create-modal")[0] as HTMLElement;
    modal.style.display = "none";
  }

  async function handleDelete() {
    if (confirm(`Are you sure you want to delete all results for ${gameName}?`)) {
      await delAllResults(uid, gameName);
      location.reload();
    }
  }

  return (
    <>
      <Nav />
      <div id="GamesList" className="px-2 text-center ">
        <h1 className="text-3xl md:text-6xl font-bold text-pink-700 opacity-80 mb-2">
          {gameName}
        </h1>
        <ResultsTable results={results} />
        <div className="flex px-16 py-2 m-auto md:mt-4 mb-6 justify-center">
          <button onClick={handleClick} className="px-16 py-2 mx-2 mb-6 bg-pink-700 hover:ring-pink-700 text-white rounded-lg ring ring-white ring-offset-2 transition ease-in-out duration-300">New</button>
          <button id="clearButton" onClick={handleDelete} className="px-16 py-2 mx-2 mb-6 bg-pink-700 hover:ring-pink-700 text-white rounded-lg ring ring-white ring-offset-2 transition ease-in-out duration-300">Clear Results</button>
        </div>
        <CreateResultModal
          uid={uid}
          gameName={gameName}
          closeModal={closeModal}
          className="create-modal hidden"
        />
      </div>
    </>
  );
}

export default ResultsPage;