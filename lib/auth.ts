import { CreateUserPrams, SignInParams } from "@/type";
import { getToken, saveToken } from "@/utils/tokenStorage";
import axios from "axios";

const API_BROWSER_URL = process.env.EXPO_PUBLIC_API_BROWSER_URL;

//Base Localhost URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserPrams) => {
  try {
    const response = await axios.post(`${API_BROWSER_URL}auth/register`, {
      name,
      email,
      password,
    });
    const { token } = response.data;
    await saveToken(token);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "Registration failed");
    } else {
      throw new Error(error.message);
    }
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const response = await axios.post(`${API_BROWSER_URL}auth/login`, {
      email,
      password,
    });
    const { token } = response.data;
    await saveToken(token);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "Login failed");
    } else {
      throw new Error(error.message);
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API_BROWSER_URL}auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to fetch user");
    } else {
      throw new Error(error?.message);
    }
  }
};
