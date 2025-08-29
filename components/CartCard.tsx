import { images } from "@/constants";
import useCartStore from "@/store/cart.store";
import { CartItemType } from "@/type";
import Checkbox from "expo-checkbox";

import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React = require("react");

const CartCard = ({
  item,
  isChecked,
  setIsChecked,
}: {
  item: CartItemType;
  isChecked: boolean;
  setIsChecked: (newValue: boolean) => void;
}) => {
  const { addItem, deleteCartItem } = useCartStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const HandleDeleteCart = async (id: string, menuId?: string) => {
    try {
      setIsLoading(true);
      await deleteCartItem({ id: id, menuId: menuId });
    } finally {
      setIsLoading(false);
    }
  };

  const addItemInCart = async (item: CartItemType) => {
    try {
      setIsLoading(true);
      await addItem({
        menuId: item.menu?.id,
        quantity: 1,
        customizations: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="cart-card">
      <View className="flex-row gap-2 items-center">
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? "#FE8C00" : undefined}
          style={{
            width: 24,
            marginInline: 4,
            height: 24,
            borderRadius: 6,
            borderColor: "#ccc",
            borderWidth: 2,
          }}
        />
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
            <TouchableOpacity
              disabled={isLoading}
              onPress={() => HandleDeleteCart(item.id, item.menu.id)}
              className="bg-orange-100 overflow-visible h-8 w-8 flex items-center rounded-lg"
            >
              <Text className="text-primary text-3xl -translate-y-1">-</Text>
            </TouchableOpacity>
            <Text className="h3-bold">
              {isLoading ? (
                <ActivityIndicator size="small" color="#F97316" />
              ) : (
                item.quantity
              )}
            </Text>
            <TouchableOpacity
              disabled={isLoading}
              onPress={() => addItemInCart(item)}
              className="bg-orange-100 overflow-visible h-8 w-8 flex items-center rounded-lg"
            >
              <Text className="text-primary text-3xl -translate-y-1">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => HandleDeleteCart(item.id)}
        className="flex self-end"
      >
        <Image resizeMode="contain" className="size-6 " source={images.trash} />
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;
