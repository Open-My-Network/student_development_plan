const baseUrl = process.env.REACT_APP_API_URL || "https://omnapi.openmynetwork.com"; // API base URL

// Function to fetch data
export const fetchData = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/development-plan/list-value`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }), // Use user_id to fetch data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (result.status === 200) {
      return result; // Return the items from the API response
    } else {
      console.error("Failed to fetch data:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchTopvalue = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/development-plan/list-top-value`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }), // Use user_id to fetch data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (result.status === 200) {
      return result; // Return the items from the API response
    } else {
      console.error("Failed to marked top:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error Marking top:", error);
    return [];
  }
};
// Function to create a new value
export const createValue = async (itemData) => {
  try {
    const response = await fetch(`${baseUrl}/development-plan/create-value`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (result.status === 200) {
      return true; // Return true on successful creation
    } else {
      console.error("Failed to create the item:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error creating item:", error);
    return false;
  }
};

// Function to delete an item
export const deleteItem = async (itemId, userId) => {
  try {
    const response = await fetch(`${baseUrl}/development-plan/delete-value`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: itemId,
        user_id: userId, // Use dynamic userId here when performing delete
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 200) {
      return true; // Return true on successful deletion
    } else {
      console.error("Failed to delete the item:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
};

// Function to mark an item as top
export const markAsTop = async (itemId, userId) => {
  try {
    const response = await fetch(`${baseUrl}/development-plan/mark-value`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: itemId,
        user_id: userId, // Use dynamic userId here when performing mark as top
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 200) {
      return true; // Return true on successful update
    } else {
      console.error("Failed to mark as top:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error marking as top:", error);
    return false;
  }
};

// Function to unmark an item as top
export const unmarkAsTop = async (itemId, userId) => {
  try {
    const response = await fetch(`${baseUrl}/development-plan/unmark-value`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: itemId,
        user_id: userId, // Use dynamic userId here when performing unmark as top
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 200) {
      return true; // Return true on successful update
    } else {
      console.error("Failed to unmark as top:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error unmarking as top:", error);
    return false;
  }
};

// Function to update an item
export const updateItem = async (itemData) => {
  try {
    const response = await fetch(`${baseUrl}/development-plan/update-value`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 200) {
      return true; // Return true on successful update
    } else {
      console.error("Failed to update the item:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error updating item:", error);
    return false;
  }
};
