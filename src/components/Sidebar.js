import React from "react";
// import "./Sidebar.css";

function Sidebar({ pins, setSelectedPin }) {
  return (
    <div className="sidebar">
      <h3>Saved Pins</h3>
      {pins.length === 0 && <p>No pins saved.</p>}
      <ul>
        {pins.map((pin, index) => (
          <li key={index} onClick={() => setSelectedPin(pin)}>
            <strong>{pin.remark}</strong>
            <p>{pin.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
