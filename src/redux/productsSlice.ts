import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/productInterfaces";

interface IProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  favorites: IProduct[];
}

const initialState: IProductsState = {
  products: [],
  loading: true,
  error: null,
  favorites: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<IProduct>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (product) => product.id !== action.payload
      );
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      console.log("Action payload: ", action.payload);

      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  addToFavorites,
  removeFromFavorites,
  addProduct,
  removeProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
