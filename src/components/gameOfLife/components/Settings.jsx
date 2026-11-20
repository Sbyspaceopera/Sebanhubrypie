import "../style.css";

export default function Settings({ onSetTps, onResize }) {
  return (
    <div className="settings">
      <button className="tps" onClick={onSetTps}>
        Changer les TPS
      </button>
      <button className="resize" onClick={onResize}>
        Taille de la grille
      </button>
    </div>
  );
}
