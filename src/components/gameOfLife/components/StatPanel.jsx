import "../style.css";

export default function StatsPanel() {
  return (
    <div className="stats-panel">
      <div className="stat-item">
        Ticks: <span id="ticks">0</span>
      </div>
      <div className="stat-item">
        Cellules vivantes: <span id="livingCells">0</span>
      </div>
    </div>
  );
}
