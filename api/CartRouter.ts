import { getToken } from "@/utils/tokenStorage";
import axios, { AxiosError } from "axios";
import { Alert } from "react-native";

interface AddCartItemData {
  menuId: string;
  quantity?: number;
  customizations?: string[];
}
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const API_PUBLIC_URL = process.env.EXPO_PUBLIC_API_BROWSER_URL;

export const postCart = async (data: AddCartItemData) => {
  try {
    const token = await getToken();
    const res = await axios.post(`${API_PUBLIC_URL}cart/add`, data, {
      headers: {
        Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGIwMzdlYzVmZTA5MTQyNTk3NmZmZmMiLCJpYXQiOjE3NTYzNzk2NDcsImV4cCI6MTc1NjQ2NjA0N30.pfAOIHKI6xNBjt6NGqgzu8zBdDVtPa6qcyZxWulXcEw`}`,
      },
    });
    return res.data;
  } catch (err) {
    const axiosErr = err as AxiosError;
    const errorMessage =
      (axiosErr.response?.data as any)?.error ||
      axiosErr.message ||
      "Failed to add item to cart";

    Alert.alert("Cart Error", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getCartItems = async () => {
  try {
    const token = await getToken();
    const res = await axios.get(`${API_PUBLIC_URL}cart/get`, {
      headers: {
        Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGIwMzdlYzVmZTA5MTQyNTk3NmZmZmMiLCJpYXQiOjE3NTYzNzk2NDcsImV4cCI6MTc1NjQ2NjA0N30.pfAOIHKI6xNBjt6NGqgzu8zBdDVtPa6qcyZxWulXcEw`}`,
      },
    });

    return res.data;
  } catch (err) {
    const axiosErr = err as AxiosError;
    const errorMessage =
      (axiosErr.response?.data as any)?.error ||
      axiosErr.message ||
      "Failed to fetch cart";

    Alert.alert("Cart Error", errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteCartItem = async (cartItemId: string, menuId?: string) => {
  try {
    const token = await getToken();

    const res = await axios.delete(`${API_PUBLIC_URL}cart/delete`, {
      headers: {
        Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGIwMzdlYzVmZTA5MTQyNTk3NmZmZmMiLCJpYXQiOjE3NTYzNzk2NDcsImV4cCI6MTc1NjQ2NjA0N30.pfAOIHKI6xNBjt6NGqgzu8zBdDVtPa6qcyZxWulXcEw`}`,
      },
      data: {
        cartItemId,
        menuId,
      },
    });

    return res.data;
  } catch (err) {
    const axiosErr = err as AxiosError;
    const errorMessage =
      (axiosErr.response?.data as any)?.error ||
      axiosErr.message ||
      "Failed to delete item from cart";

    Alert.alert("Cart Error", errorMessage);
    throw new Error(errorMessage);
  }
};
