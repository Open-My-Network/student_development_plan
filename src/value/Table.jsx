import React, { useState } from "react";
import "../App.css";

const Table = ({ data, handleDelete, handleMarkAsTop, handleUnmarkAsTop, handleEditClick}) => {
  const [openRowId, setOpenRowId] = useState(null); // State to store the ID of the row with visible options
  

  // Toggle options visibility for a specific row based on its ID
  const handleMoreClick = (id) => {
    setOpenRowId(openRowId === id ? null : id); // Toggle visibility for the specific row
  };

    // Sort the data to ensure items marked as "top" appear first
    const sortedData = [...data].sort((a, b) => {
      if (a.markAsValue && !b.markAsValue) return -1; // Move marked items to the top
      if (!a.markAsValue && b.markAsValue) return 1;
      return 0;
    });

  // Check if data is available before trying to map
  if (!Array.isArray(data)) {
    return <div>No data available</div>; // Handle when data is not available or invalid
  }

  // Helper function for button styles
  const getButtonStyle = (type) => {
    const baseStyle = {
      padding: "5px 10px",
      margin: "5px",
      borderRadius: "5px",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    };

    const styleVariants = {
      more: { backgroundColor: "#007bff" }, // Blue
      close: { backgroundColor: "#dc3545" }, // Red
      edit: { backgroundColor: "#28a745" }, // Green
      delete: { backgroundColor: "#ff073a" }, // Dark Red
      markAsTop: { backgroundColor: "#ffc107" }, // Yellow
      unmarkAsTop: { backgroundColor: "#6c757d" }, // Grey
    };

    return { ...baseStyle, ...styleVariants[type] };
  };

  return (
    <table className="api-table" >
      <thead>
        <tr>
          <th>S.N</th>
          <th>Title</th>
          <th>Statement</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {sortedData.map((item, index) => (
          <tr
            style={{
              ...trStyle,
              backgroundColor: item.markAsValue ? "#ffffcc" : trStyle.backgroundColor, // Highlight if marked as top
            }}
            key={item.id}
          >
            <td style={tdStyle}>{index + 1}</td>
            <td style={tdStyle}>{item.value_type}</td>
            <td style={tdStyle}>{item.value_title}</td>
            <td style={tdStyle}>
              <button  style={getButtonStyle(openRowId === item.id ? "close" : "more")} onClick={() => handleMoreClick(item.id)}>
                {openRowId === item.id ? "Close" : "More"}
              </button>
              {openRowId === item.id && (
                <div style={optionsStyle}>
                {/* Display Edit and Delete for marked items */}
                {item.markAsValue ? (
                  <>
                  <button style={getButtonStyle("edit")} onClick={() => handleEditClick(item)}>Edit</button>
                  <button style={getButtonStyle("delete")} onClick={() => handleDelete(item.id)}>Delete</button>
                  <button style={getButtonStyle("unmarkAsTop")} onClick={() => handleUnmarkAsTop(item.id)}>Unmark as Top</button>
                  </>
                ) : (
                  <>
                  <button style={getButtonStyle("edit")} onClick={() => handleEditClick(item)}>Edit</button>
                  <button style={getButtonStyle("delete")} onClick={() => handleDelete(item.id)}>Delete</button>
                  <button style={getButtonStyle("markAsTop")} onClick={() => handleMarkAsTop(item.id)}>Mark as Top</button>
                  </>
                )}
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
