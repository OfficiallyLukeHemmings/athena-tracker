/** @fileoverview File contains the game list section for use inside the 
 * game div. 
 */

import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database as db } from "../firebase";
import GameDiv from "./gameDiv";
import CreateGameModal from "./createGameModal";

function GamesList( { uid } ) {
  const [games, setGames] = useState([""]);
  
  useEffect(() => {
    
    const gamesRef = ref(db, `${uid}/games/`);
    onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();      
      // console.log(data);
      // console.log("exists?", snapshot.exists());
      
      
      if (snapshot.exists()) {
        const gameNames = Object.keys(data);
        setGames(gameNames);
      } else {
        setGames([""]);
        // console.log("snapshot doesn't seem to exist");
      }
    });

  }, [uid]);

  function showModal() {
    const modal = document.getElementsByClassName("game-create-modal")[0] as HTMLElement;
    modal.style.display = "inline";
  }

  function closeModal() {
    const modal = document.getElementsByClassName("game-create-modal")[0] as HTMLElement;
    modal.style.display = "none";
  }

  function createGame() {
    // newWL
  }
  
  return (
    <div id="GamesList" className="px-2 h-auto text-center ">
      <h1 className="text-4xl md:text-6xl font-bold text-pink-700 opacity-80 mb-2">Games</h1>
      <div className="flex flex-col m-auto">
        <table className="table-fixed m-auto w-full md:w-auto">
          { games.map(game => <GameDiv key={game} name={game} uid={uid}/>) }
        </table>
        
        <button onClick={showModal} className="px-16 py-3 md:py-2 m-auto mt-4 mb-6 bg-pink-700 hover:ring-pink-700 text-white rounded-lg ring ring-white ring-offset-2 transition ease-in-out duration-300">
          Create new game
        </button>
        <CreateGameModal uid={uid} closeModal={closeModal} className="game-create-modal hidden"/>
      </div>
    </div>
  );
}

export default GamesList;