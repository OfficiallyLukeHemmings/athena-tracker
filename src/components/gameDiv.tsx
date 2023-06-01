/** @fileoverview File contains the game div which lists all user's games and a corresponding
 * delete button. This dynamically updates from Firebase.
 */

import GameAnchorButton from "./gameAnchorButton";
import GameDeleteButton from "./gameDeleteButton";

function GameDiv({ name, uid }) {

  if (name) {
    return (
      <tr>
        <td className="gameDiv flex flex-row justify-center align-middle m-auto">
          <GameAnchorButton name={name}/>
        </td>
        <td>
          <GameDeleteButton name={name} uid={uid}/>
        </td>
      </tr>
    );
  }
  else {
    return (
      <h3>No games found</h3>
    );
  }

}

export default GameDiv;