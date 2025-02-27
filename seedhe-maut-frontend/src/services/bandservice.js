import API from "./api"; // Import Axios instance

export const getBands = async () => {
  try {
    const response = await API.get("/band/bands");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};



