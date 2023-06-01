import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

import { Pie } from "react-chartjs-2";



function AnalyticsModal({ results }) {

  const winCount = results.filter((result) => result.isWin).length;
  const lossCount = results.filter((result) => !result.isWin).length;

  ChartJS.register(ArcElement, Tooltip, Legend);

  const chartData = {
    
      labels: ["Wins", "Losses"],
      datasets: [
        {
          label: "Results",
          data: [winCount, lossCount],
          backgroundColor: ["rgb(0,255,0)", "rgb(255,0,0)"],
          hoverOffset: 10,
        },
      ],

  }

  function closeModal() {
    const el = document.getElementById("analyticsModal") as HTMLElement;
    el.style.display = "none";
    
    const el2 = document.getElementById("showChartButton") as HTMLElement;
    el2.style.display = "inline";
  }

  return (
    <div id="analyticsModal" className="hidden mx-auto top-36 left-0 right-0 md:top-48 bg-white h-2/3">
      <button onClick={closeModal} className=" m-auto px-16 py-2 mt-2 bg-sky-400 hover:ring-sky-400 text-white bold rounded-lg ring ring-white ring-offset-2 transition ease-in-out duration-300">Hide Chart</button>
      <Pie data={chartData} />
      <p className="mt-2">Wins:{winCount} - Losses:{lossCount}</p>
    </div>
  );
}

export default AnalyticsModal;
