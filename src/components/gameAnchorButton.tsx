function GameAnchorButton({ name }) {
  if (name) {
    return (
      <a
        href={`/${name}/results`}
        id={name}
        className="text-md md:text-xl px-2 md:px-32 py-6 mx-4 my-8 min-w-4xl w-full rounded-lg ring ring-white ring-offset-2 transition ease-in-out duration-300 hover:ring-pink-700"
      >
        {name}
      </a>
    );
  }
  else return <></>
}

export default GameAnchorButton;
