const apiDomain = process.env.NEXT_PUBLIC_API_URL || null;

const fetchProperties = async () => {
  try {
    if (!apiDomain) {
      return [];
    }
    const response = await fetch(`${apiDomain}/properties`, {
      cache: "no-store", // this will make sure that the browser does not cache the response of the fetch request instead it will make a new request to the server
    });

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch properties.");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

// fetch single property

const fetchProperty = async (propertyId) => {
  try {
    if (!apiDomain) {
      return null;
    }
    const response = await fetch(`${apiDomain}/properties/${propertyId}`);

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch properties.");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export { fetchProperties, fetchProperty };
