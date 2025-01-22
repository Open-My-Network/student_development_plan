import React, { useState } from "react";
import "../App.css";

const Table = ({ data, handleDelete, handleMarkAsTop, handleUnmarkAsTop }) => {
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
              <button onClick={() => handleMoreClick(item.id)}>
                {openRowId === item.id ? "Close" : "More"}
              </button>
              {openRowId === item.id && (
                <div style={optionsStyle}>
                {/* Display Edit and Delete for marked items */}
                {item.markAsValue ? (
                  <>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                  <button onClick={() => handleUnmarkAsTop(item.id)}>Unmark as Top</button>
                  </>
                ) : (
                  <>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                  <button onClick={() => handleMarkAsTop(item.id)}>Mark as Top</button>
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
