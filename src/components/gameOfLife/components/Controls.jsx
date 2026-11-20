import "../style.css";

export default function Controls({ onTick, onPlay, onPause, onReset }) {
  return (
    <div className="controls">
      <button id="tickB" onClick={onTick}>
        +1 Tick
      </button>
      <button id="playB" onClick={onPlay}>
        Reprendre
      </button>
      <button id="pauseB" onClick={onPause}>
        Pause
      </button>
      <button id="resetB" onClick={onReset}>
        Reccomencer
      </button>
    </div>
  );
}
