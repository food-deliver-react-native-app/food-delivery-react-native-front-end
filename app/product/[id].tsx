import useAxios from "@/hooks/useAxios";
import { MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";

import { StarRatingDisplay } from "react-native-star-rating-widget";
const ProductPage = () => {
  const { id } = useLocalSearchParams();

  const { data, refetch, loading } = useAxios<MenuItem>({
    url: "menu",
    config: {
      params: {
        id: id,
      },
    },
  });

  const item: MenuItem = data! || [];

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full">
      <View className="flex-row items-center w-full my-5 relative">
        <View className="gap-y-3 z-10">
          <Text className="h1-bold">{item.name}</Text>
          <Text className="base-semibold text-gray-100">
            {item.category.name}
          </Text>
          <View className="flex-row items-center gap-4">
            <StarRatingDisplay
              starSize={24}
              color="#FE8C00"
              rating={item.rating}
            />
            <Text className="base-semibold text-gray-100">
              {item.rating} / 5
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="base-bold text-primary">$</Text>
            <Text className="h1-bold">{item.price}</Text>
          </View>
          <View className="flex-row items-center gap-4">
            <View>
              <Text className="base-semibold text-gray-100">Calories</Text>
              <Text className="base-semibold">{item.calories} Cal</Text>
            </View>
            <View>
              <Text className="base-semibold text-gray-100">Protein</Text>
              <Text className="base-semibold">{item.protein}g</Text>
            </View>
          </View>
        </View>
        <Image
          source={{ uri: item.image_url }}
          className="size-full absolute translate-x-40 mt-14 z-0"
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductPage;
