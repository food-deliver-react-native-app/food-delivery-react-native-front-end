import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

interface UseAxiosOptions<T> {
  url: string;
  config?: AxiosRequestConfig;
  skip?: boolean;
}

interface UseAxiosReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newConfig?: AxiosRequestConfig) => Promise<void>;
}

const useAxios = <T>({
  url,
  config = {},
  skip = false,
}: UseAxiosOptions<T>): UseAxiosReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

  const API_BROWSER_URL = process.env.EXPO_PUBLIC_API_BROWSER_URL;

  const fetchData = useCallback(
    async (customConfig?: AxiosRequestConfig) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url: `${API_BROWSER_URL}${url}`,
          ...config,
          ...customConfig,
        });

        setData(response.data);
      } catch (err) {
        const axiosErr = err as AxiosError;
        const errorMessage =
          (axiosErr.response?.data as any)?.message ||
          axiosErr.message ||
          "An unknown error occurred";

        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if (!skip) {
      fetchData();
    }
  }, []);

  const refetch = async (newConfig?: AxiosRequestConfig) => {
    await fetchData(newConfig);
  };

  return { data, loading, error, refetch };
};

export default useAxios;
