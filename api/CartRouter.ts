import { getToken } from "@/utils/tokenStorage";
import axios, { AxiosError } from "axios";
import { Alert } from "react-native";

interface AddCartItemData {
  menuId: string;
  quantity?: number;
  customizations?: string[];
}
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const postCart = async (data: AddCartItemData) => {
  try {
    const token = await getToken();
    const res = await axios.post(`${API_BASE_URL}cart/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await getCartItems();
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
    const res = await axios.get(`${API_BASE_URL}cart/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
