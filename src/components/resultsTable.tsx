import AnalyticsModal from "./analyticsModal";

function ResultsTable({ results }) {

  const iterableResults = Object.keys(results).map(key => ({
    id: key,
    ...results[key]
  }));
  // Reversing so it's in reverse-chronological order
  iterableResults.reverse()


  function showModal() {
    const modal = document.getElementById("analyticsModal");
    modal!.style.display = "inline";

    const el = document.getElementById("showChartButton");
    el!.style.display = "none";
  }

  return ( 
    <div className="flex flex-col justify-center mx-auto mt-6 md:mt-12 h-fit">
      <table className="m-auto w-4/5 md:w-1/2 table-fixed">
        <thead>
          <tr>
            <th className="text-2xl ">Date</th>
            <th className="text-2xl ">Result</th>
          </tr>
        </thead>
        <tbody>
          {iterableResults.map((result) => (
            <tr key={result.id} className="hover:bg-pink-700/10">
              <td className="py-2">{new Date(result.recorded).toLocaleString().slice(0,-3)}</td>
              <td>{result.isWin ? "Win" : "Loss"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {iterableResults.length > 0 && <button id="showChartButton" onClick={showModal} className="px-16 py-2 mt-2 mx-auto bg-sky-400 hover:ring-sky-400 text-white rounded-lg ring ring-white ring-offset-2 transition ease-in-out duration-300">Show Chart</button>}
        <AnalyticsModal results={iterableResults}/>
    </div>
   );
}

export default ResultsTable;