const baseUrl = "http://localhost:4000";

export const fetchData = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/development-plan/list-value`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    const result = await response.json();

    if (result.status === 200) {
      return result.items; // Return the items from the API response
    } else {
      console.error("Failed to fetch data");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const deleteItem = async (itemId, userId) => {
  try {
    const response = await fetch(`${baseUrl}/development-plan/delete-value`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: itemId,
        user_id: userId,
      }),
    });

    const result = await response.json();

    if (result.status === 200) {
      return true; // Return true on successful deletion
    } else {
      console.error("Failed to delete the item");
      return false;
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
};

export const markAsTop = async (itemId, userId) => {
  try {
    const response = await fetch(`${baseUrl}/development-plan/mark-value`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: itemId,
        user_id: userId,
      }),
    });

    const result = await response.json();

    if (result.status === 200) {
      return true; // Return true on successful update
    } else {
      console.error("Failed to mark as top");
      return false;
    }
  } catch (error) {
    console.error("Error marking as top:", error);
    return false;
  }
};
