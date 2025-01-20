import React, { useState, useEffect } from "react";
import Table from "./value/Table";
import { fetchData, deleteItem, markAsTop } from "./value/service/api";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = 645;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await fetchData(userId);
      console.log(result);
      setData(result.items ? result.items : []);
      setLoading(false);
    };

    getData();
  }, []);

  // Handle delete action
  const handleDelete = async (itemId) => {
    setLoading(true);
    const success = await deleteItem(itemId, userId);
    if (success) {
      setData((prevData) => prevData.filter((item) => item.id !== itemId));
    }
    setLoading(false);
  };

  // Handle marking an item as top
  const handleMarkAsTop = async (itemId) => {
    const isMarked = await markAsTop(itemId, userId);
    if (isMarked) {
      // Update local state to reflect the change
      setData((prevData) =>
        prevData.map((item) =>
          item.id === itemId ? { ...item, markAsValue: true } : item
        )
      );
    } else {
      console.error("Failed to mark item as top");
    }
  };

  return (
    <>
      <div className="table-header" style={headerStyle}>
        <h2>
          CONSIDER THE FOLLOWING QUESTIONS TO ASK YOURSELF ON THIS JOURNEY
        </h2>
      </div>
      {loading && <div className="loading">Loading...</div>}
      <Table
        data={data}
        handleDelete={handleDelete}
        handleMarkAsTop={handleMarkAsTop}
      />
    </>
  );
};

const headerStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  textAlign: "center",
  padding: "10px",
};

export default App;
