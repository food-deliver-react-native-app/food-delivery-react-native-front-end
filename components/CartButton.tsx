import { images } from "@/constants";
import useCartStore from "@/store/cart.store";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


const CartButton = () => {
  const { items } = useCartStore();

  return (
    <TouchableOpacity
      className="cart-btn"
      onPress={() => router.push("/sign-in")}
    >
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      <View className="small-bold min-w-4 absolute flex-center text-white  -translate-y-4 bg-primary rounded-full translate-x-3">
        <Text className="small-bold text-white">{items.length || 0}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartButton;
