import React, { useState } from "react";

const Table = ({ data, handleDelete, handleMarkAsTop }) => {
  const [openRowId, setOpenRowId] = useState(null); // State to store the ID of the row with visible options

  // Toggle options visibility for a specific row based on its ID
  const handleMoreClick = (id) => {
    setOpenRowId(openRowId === id ? null : id); // Toggle visibility for the specific row
  };

  // Check if data is available before trying to map
  if (!Array.isArray(data)) {
    return <div>No data available</div>; // Handle when data is not available or invalid
  }

  return (
    <table className="styled-table" style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>S.N</th>
          <th style={thStyle}>Title</th>
          <th style={thStyle}>Content</th>
          <th style={thStyle}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr style={trStyle} key={item.id}>
            <td style={tdStyle}>{index + 1}</td>
            <td style={tdStyle}>{item.value_title}</td>
            <td style={tdStyle}>{item.value_type}</td>
            <td style={tdStyle}>
              <button onClick={() => handleMoreClick(item.id)}>
                {openRowId === item.id ? "Close" : "More"}
              </button>
              {openRowId === item.id && (
                <div style={optionsStyle}>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                  <button onClick={() => handleMarkAsTop(item.id)}>Mark as Top</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px 60px 0px 60px",
};

const thStyle = {
  backgroundColor: "#f2f2f2",
  color: "#333",
  padding: "12px 15px",
  textAlign: "left",
  fontWeight: "bold",
  border: "1px solid #ddd",
};

const tdStyle = {
  padding: "12px 15px",
  border: "1px solid #ddd",
};

const trStyle = {
  backgroundColor: "#f9f9f9",
};

const optionsStyle = {
  marginTop: "10px",
};

export default Table;
