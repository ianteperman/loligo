import { useState } from "react";
import PlantillaMadre from "./plantillamadre";
import RecruiterDesdePlantilla from "./RecruiterDesdePlantilla";

export default function App() {
  const [screen, setScreen] = useState("plantilla");

  return (
    <div>
      <div style={{ padding: 12, display: "flex", gap: 8 }}>
        <button onClick={() => setScreen("plantilla")}>Plantilla madre</button>
        <button onClick={() => setScreen("recruiter")}>Recruiter desde plantilla</button>
      </div>

      {screen === "plantilla" ? <PlantillaMadre /> : <RecruiterDesdePlantilla />}
    </div>
  );
}