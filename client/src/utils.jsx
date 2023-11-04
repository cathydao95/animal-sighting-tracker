export const formatSightingDate = (dateString) => {
  const sightingDate = new Date(dateString);
  return sightingDate.toLocaleString();
};

const BASE_URL = "http://localhost:8080/api/v1";

export const fetchData = async (
  url,
  method = "GET",
  headers = {},
  data = null
) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error occurred while fetching data", error);
    throw error;
  }
};

export default fetchData;
