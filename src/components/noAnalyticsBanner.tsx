function NoAnalyticsBanner() {

  function handleClick() {
    const el = document.getElementById("banner") as HTMLElement;
    el.style.display = "none";
  }

  return (
    <footer id="banner" className="flex fixed w-screen left-0 bottom-0 bg-pink-700/50 justify-center align-center mx-auto py-4 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200 z-50 opacity-90">
      <p className="text-white font-bold text-center md:text-justify align-middle text-sm md:text-base max-w-xs md:max-w-3xl">Analytics page removed temporarily while undergoing improvements</p>
      <button onClick={handleClick} className="absolute right-10 bottom-2 font-bold align-middle text-gray-600 text-2xl md:text-3xl hover:text-white">X</button>
    </footer>
  );
}

export default NoAnalyticsBanner;
