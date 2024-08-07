/* export const PRODUCT_URL = 'localhost:4000/produkter'; // Update with the correct API endpoint URL

export const fetchProducts = async () => {
    console.log("hej")
  try {
    const response = await fetch(PRODUCT_URL);
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const productsData = await response.json();
    return productsData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; */