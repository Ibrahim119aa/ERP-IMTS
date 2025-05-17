import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchAllStudents = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/refresh`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
