import React, { useState } from "react";

const EditPopup = ({ item, onSubmit, onCancel }) => {
  const [statement, setStatement] = useState(item?.value_title || "");
  const [valueType, setValueType] = useState(item?.value_type || "");

  const handleSave = () => {
    const updatedItem = { ...item, statement, value_type: valueType };
    onSubmit(updatedItem); // Call the submit handler with updated data
  };

  return (
    <div style={popupStyle}>
      <div style={popupContentStyle}>
        <h3 style={headerStyle}>Edit Item</h3>
        <div style={formStyle}>
        <label style={labelStyle}>
            Value Type:
            <select
              value={valueType}
              onChange={(e) => setValueType(e.target.value)}
              style={inputStyle}
            >
              <option value="" disabled>
                Select a value type
              </option>
              <option value="Mission">Mission</option>
              <option value="Personal Core Value">Personal Core Value</option>
            </select>
          </label>
          <label style={labelStyle}>
            Statement:
            <textarea  onChange={(e) => setStatement(e.target.value)}>
              {statement}
            </textarea>

          </label>
          <div style={buttonGroupStyle}>
            <button onClick={handleSave} style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}>
              Save
            </button>
            <button onClick={onCancel} style={{ ...buttonStyle, backgroundColor: "#f44336" }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const popupContentStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "420px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  animation: "fadeIn 0.3s ease-in-out",
  fontFamily: "'Arial', sans-serif",
};
const headerStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#333",
  textAlign: "center",
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};
const labelStyle = {
  fontWeight: "bold",
  fontSize: "14px",
  color: "#555",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
  transition: "border-color 0.3s",
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  marginTop: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "6px",
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background-color 0.3s",
};
// Adding hover effect
Object.assign(buttonStyle, {
  ":hover": {
    filter: "brightness(1.1)",
  },
});

export default EditPopup;
