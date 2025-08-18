import { images } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
const CartButton = () => {
  const totalItems = 10;
  return (
    <TouchableOpacity
      className="cart-btn"
      onPress={() => router.push("/sign-in")}
    >
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {totalItems > 0 && (
        <View className="small-bold min-w-4 absolute flex-center text-white  -translate-y-4 bg-primary rounded-full translate-x-3">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
