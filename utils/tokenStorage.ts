import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "user_token";

export const saveToken = async (token: string) => {
  if (Platform.OS === "web") {
    return await AsyncStorage.setItem(TOKEN_KEY, token);
  } else {
    return await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
};

export const getToken = async (): Promise<string | null> => {
  if (Platform.OS === "web") {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } else {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }
};

export const deleteToken = async () => {
  if (Platform.OS === "web") {
    return await AsyncStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
};
