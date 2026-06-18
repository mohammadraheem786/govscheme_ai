import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const checkEligibility = async (userProfile, category) => {
  const response = await API.post("/api/query", {
    userProfile,
    category,
  });
  return response.data;
};