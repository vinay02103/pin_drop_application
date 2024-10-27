import React, { useState } from "react";

function PinPopup({ onSave, onCancel }) {
  const [remark, setRemark] = useState("");

  const handleSave = () => {
    if (remark) onSave(remark);
  };

  return (
    <div className="pin-popup">
      <h4>Enter Remark</h4>
      <input
        type="text"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
        placeholder="Enter a remark"
      />
      <div className="pin-popup-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default PinPopup;
