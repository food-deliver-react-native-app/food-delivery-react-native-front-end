import { images } from "@/constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
const CartButton = () => {
  const totalItems = 10;
  return (
    <TouchableOpacity
      className="cart-btn"
      onPress={() => router.push("/sign-in")}
    >
      <Image source={images.bag} className="size-5" contentFit="contain" />
      {totalItems > 0 && (
        <View className="small-bold text-white">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
