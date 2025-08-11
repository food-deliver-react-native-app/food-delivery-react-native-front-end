import { images } from "@/constants";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity, View } from "react-native";
const CartButton = () => {
  const totalItems = 10;
  return (
    <TouchableOpacity className="cart-btn" onPress={() => {}}>
      <Image source={images.bag} className="size-5" contentFit="contain" />
      {totalItems > 0 && (
        <View className="small-bold text-white">{totalItems}</View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
