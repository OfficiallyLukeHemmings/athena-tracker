import { useState } from "react";
import { delGame } from "../database";

function GameDeleteButton({ name, uid }) {
  //TODO - Fix "undefined", and fix this in the delGame function

  function handleClick() {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      delGame(`${uid}`, name);
    }
  }

  if (name) {
    return (
      <button
        id={name + "Delete"}
        name={name}
        onClick={handleClick}
        className="bg-pink-700 hover:bg-pink-800 hover:drop-shadow-xl rounded-lg align-middle mx-4 px-5 md:px-6 py-3 md:py-4 m-auto select-none"
      >
        🗑️
      </button>
    );
  }
  else return <></>
}

export default GameDeleteButton;
