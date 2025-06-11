import React, { useState, useEffect } from "react";
import { fetchData, deleteItem, markAsTop, unmarkAsTop, updateItem, fetchTopvalue, createValue } from '../../value/service/api';
import { motion } from "framer-motion";

const DynamicRenderer = ({ content, goNext, goToSlide }) => {
  const [topValue, setTopValue] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coreValue, setCoreValue] = useState("");
  const [missionStatement, setMissionStatement] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editValueType, setEditValueType] = useState("");
  const [editValueTitle, setEditValueTitle] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [formValues, setFormValues] = useState({
  core_value: "",
  mission_statement: ""
  });
  const userId = localStorage.getItem('user_id') || 3;

  // Check if current content has a table with apiBind = true
  const hasApiTable = Array.isArray(content)
    ? content.some((item) => item.type === "apitable" && item.apiBind)
    : false;

  // Fetch data from API if table is API bound
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [topData, regularData] = await Promise.all([
        fetchTopvalue(userId),
        fetchData(userId)
      ]);

      setTopValue(topData.items || []);
      setApiData(regularData.items || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch API data:", err);
      setApiData([]);
      setTopValue([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasApiTable) {
      fetchAllData();
    } else {
      setApiData([]);
      setTopValue([]);
    }
  }, [content, hasApiTable]);

  // Handle submit for core value and mission statement
const handleSubmit = async (targetSlideId) => {
  
  const valueTypeMap = {
    'core_value': 'personal_core',
    'mission_statement': 'personal_mission'
  };

  const fieldName = targetSlideId;
  const statement = formValues[fieldName];
  console.log("Submitting:",targetSlideId);

  if (!statement || statement.trim() === "") {
    alert("Please fill out the statement!");
    return;
  }

  try {
    const isSuccess = await createValue({
      user_id: userId,
      value_type: valueTypeMap[fieldName],
      statement: statement
    });

    if (isSuccess) {
      alert(`${fieldName === 'core_value' ? 'Core Value' : 'Mission Statement'} submitted successfully!`);
      setFormValues(prev => ({ ...prev, [fieldName]: "" }));
      fetchAllData();
    } else {
      alert('Failed to submit statement');
    }
  } catch (error) {
    console.error('Error submitting statement:', error);
    alert('An error occurred while submitting the statement');
  }
};
  // Function for deleting an item
  const handleDelete = async (itemId) => {
    const isSuccess = await deleteItem(itemId, userId);
    if (isSuccess) {
      fetchAllData(); // Refresh data after deletion
      alert('Item deleted successfully');
    } else {
      alert('Failed to delete item');
    }
  };

  // Function for marking an item as top
  const handleMarkAsTop = async (itemId) => {
    const isSuccess = await markAsTop(itemId, userId);
    if (isSuccess) {
      fetchAllData(); // Refresh data after marking
      alert('Item marked as top');
    } else {
      alert('Failed to mark item as top');
    }
  };

  // Function for unmarking an item as top
  const handleUnmarkAsTop = async (itemId) => {
    const isSuccess = await unmarkAsTop(itemId, userId);
    if (isSuccess) {
      fetchAllData(); // Refresh data after unmarking
      alert('Item unmarked as top');
    } else {
      alert('Failed to unmark item');
    }
  };

  // Function to handle opening the edit modal
  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditValueType(item.value_type);
    setEditValueTitle(item.value_title);
    setShowEditModal(true);
  };

  // Function to handle the update submission
  const handleUpdateSubmit = async () => {
    if (!editValueType || !editValueTitle) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const updatedItem = {
        item_id: editingItem.id,
        user_id: userId,
        value_type: editValueType,
        statement: editValueTitle,
        is_top: editingItem.is_top || false
      };

      const isSuccess = await updateItem(updatedItem);

      if (isSuccess) {
        fetchAllData(); // Refresh data from server
        setShowEditModal(false);
        alert('Item updated successfully');
      } else {
        alert('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('An error occurred while updating the item');
    }
  };

  // Custom Modal Component
  const EditModal = () => {
    if (!showEditModal) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '80%',
          maxWidth: '500px'
        }}>
          <h2 style={{ marginBottom: '20px' }}>Edit Item</h2>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Type</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              value={editValueType}
              onChange={(e) => setEditValueType(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Statement</label>
            <textarea
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
              value={editValueTitle}
              onChange={(e) => setEditValueTitle(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={handleUpdateSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render the dynamic content based on the content array
  const renderContent = (item, keyPrefix = "") => {
    if (!item) return null;

    switch (item.type) {
      case "button":
  return (
    <button
      key={keyPrefix}
      className={item.css}
      onClick={() => {
        if (item.action === "goNext" && goNext) {
          goNext();
        } else if (item.action === "goToSlide" && goToSlide && item.targetSlideId) {
          goToSlide(item.targetSlideId);
        } else if (item.link) {
          window.location.href = item.link;
        } else if (item.action === "submitCoreValueStatement") {
          handleSubmit(item.targetSlideId);
        }
      }}
    >
      {item.body}
    </button>
  );
      case "heading":
        return (
          <motion.h2
            key={keyPrefix}
            className={item.css}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
        );

      case "paragraph":
        return (
          <p key={keyPrefix} className={item.css}>
            {item.body}
          </p>
        );

      case "image":
        return <img key={keyPrefix} src={item.body} alt="" className={item.css} />;
      
      case "video":
        return (
          <div key={keyPrefix} className={item.css}>
            <video controls className="img-fluid rounded-2 shadow-sm" style={{ maxWidth: '100%' }}>
              <source src={item.body} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );

      case "input":
        return (
          <input
            key={keyPrefix}
            className={item.css}
            type={item.attributes?.type || "text"}
            placeholder={item.attributes?.placeholder || ""}
          />
        );

case "textarea":
  // Default to 'core_value' if targetSlideId is undefined
  const targetType = item.targetSlideId || 'core_value';
  console.log('Rendering textarea with targetType:', targetType);
  
  return (
    <textarea
      key={keyPrefix}
      className={item.css}
      rows={item.attributes?.rows || 3}
      placeholder={item.attributes?.placeholder || ""}
      value={formValues[targetType] || ""}
      onChange={(e) => {
        console.log('Textarea onChange - targetType:', targetType, 'value:', e.target.value);
        setFormValues(prev => ({
          ...prev,
          [targetType]: e.target.value
        }));
      }}
    />
  );

      case "apitable":
        if (item.apiBind) {
          return (
            <>
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                <table key={keyPrefix} className={item.css}>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Statement</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : topValue.length === 0 && apiData.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center">
                          No data available
                        </td>
                      </tr>
                    ) : (
                      <>
                        {topValue.map((row) => (
                          <tr key={row.id} style={{ backgroundColor: '#ffffcc' }}>
                            <td>{row.value_type}</td>
                            <td>{row.value_title}</td>
                            <td>
                              <button
                                className="btn btn-secondary btn-sm me-2"
                                onClick={() => handleUnmarkAsTop(row.id)}
                              >
                                Unmark as Top
                              </button>
                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEditClick(row)}
                              >
                                Update
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(row.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                        {apiData.filter(item => !topValue.some(topItem => topItem.id === item.id)).map((row) => (
                          <tr key={row.id}>
                            <td>{row.value_type}</td>
                            <td>{row.value_title}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => handleMarkAsTop(row.id)}
                              >
                                Mark as Top
                              </button>
                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEditClick(row)}
                              >
                                Update
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(row.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <EditModal/>
            </>
          );
        } else {
          return (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <table key={keyPrefix} className={item.css}>
                <thead>
                  <tr>
                    {item.items?.[0]?.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.items
                    ?.slice(1)
                    ?.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          );
        }

      case "row":
        if (Array.isArray(item.content)) {
          return (
            <div key={keyPrefix} className="row">
              {item.content.map((colBlock, index) => {
                if (typeof colBlock === "object" && !Array.isArray(colBlock)) {
                  const isNamedCol =
                    Object.keys(colBlock).length === 1 &&
                    colBlock[Object.keys(colBlock)[0]].items;
                  if (isNamedCol) {
                    const [colValue] = Object.entries(colBlock)[0];
                    return (
                      <div
                        key={`${keyPrefix}-col-named-${index}`}
                        className={colValue.css}
                      >
                        {colValue.items.map((child, idx) =>
                          renderContent(child, `${keyPrefix}-${index}-child-${idx}`)
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={`${keyPrefix}-col-${index}`}
                        className={colBlock.css}
                      >
                        {colBlock.items.map((child, idx) =>
                          renderContent(child, `${keyPrefix}-${index}-child-${idx}`)
                        )}
                      </div>
                    );
                  }
                }
                return null;
              })}
            </div>
          );
        }
        return null;

      default:
        if (item.div && Array.isArray(item.content)) {
          return (
            <div key={keyPrefix} className={item.css || ""}>
              {item.content.map((child, idx) => renderContent(child, `${keyPrefix}-child-${idx}`))}
            </div>
          );
        } else if (Array.isArray(item.content)) {
          return <>{item.content.map((child, idx) => renderContent(child, `${keyPrefix}-child-${idx}`))}</>;
        }
        return null;
    }
  };

  return (
    <div>
      {Array.isArray(content)
        ? content.map((item, index) => renderContent(item, `top-${index}`))
        : renderContent(content)}
    </div>
  );
};

export default DynamicRenderer;
