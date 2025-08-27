import { images } from "@/constants";
import { CartItemType } from "@/type";
import { Image, Text, View } from "react-native";
import React = require("react");

const CartCard = ({ item }: { item: CartItemType }) => {
  return (
    <View className="cart-card">
      <View className="flex-row gap-2 items-center">
        <Text>{0}</Text>
        <Image
          resizeMode="contain"
          className="size-20 bg-orange-100 rounded-lg"
          source={{ uri: item.menu?.image_url }}
        />
        <View className="flex gap-y-2">
          <View className="gap-y-2">
            <Text className="base-bold">{item.menu?.name}</Text>
            <Text className="base-semibold text-primary">
              ${item.menu?.price}
            </Text>
          </View>
          <View className="flex-row items-center gap-4">
            <View className="bg-orange-100 overflow-visible h-8 w-8 flex items-center rounded-lg">
              <Text className="text-primary text-3xl -translate-y-1">-</Text>
            </View>
            <Text className="h3-bold">{item.quantity}</Text>
            <View className="bg-orange-100 overflow-visible h-8 w-8 flex items-center rounded-lg">
              <Text className="text-primary text-3xl -translate-y-1">+</Text>
            </View>
          </View>
        </View>
      </View>
      <Image
        resizeMode="contain"
        className="size-6 flex self-end"
        source={images.trash}
      />
    </View>
  );
};

export default CartCard;
