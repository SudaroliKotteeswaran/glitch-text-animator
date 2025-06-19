import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import "./index.css";
import { exportAnimation } from "./exportUtils";


const fonts = [
  "Arial, sans-serif",
  "Courier New, monospace",
  "Georgia, serif"
];

const glitchStyles = ["jitter", "rgb-split"];

export default function App() {
  const [text, setText] = useState("Glitch Me!");
  const [font, setFont] = useState(fonts[0]);
  const [glitchStyle, setGlitchStyle] = useState("jitter");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [glitchColor, setGlitchColor] = useState("#FF00FF");
  const [speed, setSpeed] = useState(1);
  const [lightMode, setLightMode] = useState(false);

  const modeClass = lightMode ? "light" : "dark";

  return (
    <div className={`app-container ${modeClass}`}>
      <header className="header">
        <h1>Glitch Text Animator</h1>
        <button className="toggle-theme" onClick={() => setLightMode(!lightMode)}>
          {lightMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <main className="main-content">
        <section className="controls">
          <div className="control-group">
            <label htmlFor="text">Enter Text:</label>
            <input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your glitch text..."
            />
          </div>

          <div className="control-group">
            <label htmlFor="font">Font:</label>
            <select id="font" value={font} onChange={(e) => setFont(e.target.value)}>
              {fonts.map((f) => (
                <option key={f} value={f}>{f.split(",")[0]}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="glitchStyle">Glitch Style:</label>
            <select id="glitchStyle" value={glitchStyle} onChange={(e) => setGlitchStyle(e.target.value)}>
              {glitchStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="speed">Animation Speed: {speed}s</label>
            <input
              id="speed"
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Text Color:</label>
            <HexColorPicker color={textColor} onChange={setTextColor} />
          </div>

          <div className="control-group">
            <label>Glitch Color:</label>
            <HexColorPicker color={glitchColor} onChange={setGlitchColor} />
          </div>
        </section>

      <section className="preview" id="preview-glitch">
        <div
    className={`glitch-text ${glitchStyle}`}
    style={{
      fontFamily: font,
      color: textColor,
      animationDuration: `${speed}s`,
      "--glitch-color": glitchColor,
    }}
  >
    {text}
  </div>

  <div className="export-buttons">
    <button onClick={() => exportAnimation("preview-glitch", "gif")}>
      🎞 Export GIF
    </button>
    <button onClick={() => exportAnimation("preview-glitch", "webm")}>
      📹 Export MP4
    </button>
  </div>
</section>

        </main>

      <footer className="footer">
        <p>© 2025 Glitch Text Animator | Built with ❤️ in React</p>
      </footer>
    </div>
  );
}
