import React, { useState, useEffect } from "react";
import MapInterface from "./components/MapInterface";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [pins, setPins] = useState(
    () => JSON.parse(localStorage.getItem("pins")) || []
  );
  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(() => {
    localStorage.setItem("pins", JSON.stringify(pins));
  }, [pins]);

  const handleAddPin = (pin) => {
    setPins([...pins, pin]);
  };

  return (
    <div className="app-container">
      <Sidebar pins={pins} setSelectedPin={setSelectedPin} />
      <MapInterface
        pins={pins}
        onAddPin={handleAddPin}
        selectedPin={selectedPin}
      />
    </div>
  );
}

export default App;
