/**
 * @fileoverview Utility functions for interacting with the Firebase 
 * Realtime Database.
 */

import { ref, set, serverTimestamp, push, remove } from "firebase/database";
import { database as db } from "./firebase";


export async function createGame(user: string, gameName: string, type:string="WinLoss"): Promise<void> {
  // Type referring to game type - e.g. Win/Loss, time (race), score...
  await set(ref(db, `${user}/games/${gameName}`), {
      "type": type,
      "results": {  },
  });
}

export async function delGame(user: string, gameName: string): Promise<void> {
  await remove(ref(db, `${user}/games/${gameName}`))
    .catch(err => { throw err });
}

export async function newWLResult(user: string, gameName: string, isWin: boolean): Promise<void> {
  // WL referring to win/loss - i.e. a win/loss result.
  //TODO: guard against incorrect result type.

  await push(ref(db, `${user}/games/${gameName}/results`), {
    recorded: serverTimestamp(),
    isWin: isWin
  });
}

export async function delAllResults(user: string, gameName: string): Promise<void> {
  await set(ref(db, `${user}/games/${gameName}/results`), null)
    .catch(err => { throw err });
  //TODO: guard against incorrect result type.
}
