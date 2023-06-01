import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onValue, ref } from 'firebase/database';
import { database as db, auth } from "../firebase";
// import { createGame, delAllResults, delGame, newWLResult } from "../database";
import GamesList from '../components/gamesList';
import { createGame, delAllResults, delGame, newWLResult } from '../database';
import Nav from '../components/nav';
import NoAnalyticsBanner from '../components/noAnalyticsBanner';

function GamesPage() {
  const [uid, setUid] = useState("");

  // Redirecting unauthenticated users.
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // console.log("signed in as:", user);
      setUid(user.uid);
    } else {
      // console.log("signed out");
      window.location.replace("/login");
    }
  });
  // If not authenticated...
  if (!auth) {
    // Redirect user to login page.
    window.location.replace("/login");
  }

  function handleSignout() {
    signOut(auth);
  }

  // Admin test functions
  
  function testDB() {
    createGame(uid, "testGameName");
  }

  function testResult() {
    newWLResult(uid, "testGameName", true);
  }

  
  function testDel() {
    delGame(uid, "testGameName");
  }

  function testAllResults() {
    delAllResults(uid, "testGameName");
  }
  // END    Admin test functions

  return (
    <>
      <Nav/>
      <NoAnalyticsBanner/>
      <GamesList uid={uid}/>
    </>
  );
}

export default GamesPage;