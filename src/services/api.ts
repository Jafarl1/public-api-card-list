import { IProduct } from "../interfaces/productInterfaces";

export const fetchProductsFromApi = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch products from Api.");
    }
  }
};

export const deleteProductFromApi = async (id: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/products/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to delete product.");
    }
  }
};

export const fetchCategoriesFromApi = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/products/categories`
    );

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch categories from Api.");
    }
  }
};

export const createProduct = async (productData: IProduct) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to create product.");
    }
  }
};

export const fetchProductInfoFromApi = async (id: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Failed to fetch product info from Api."
      );
    }
  }
};
