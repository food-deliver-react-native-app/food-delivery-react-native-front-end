import useCartStore from "@/store/cart.store";
import { MenuItem } from "@/type";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { addItem } = useCartStore();

  const addItemInCart = async () => {
    addItem({
      menuId: item.id,
      quantity: 1,
      customizations: [],
    });
  };

  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: item.image_url }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">
        From ${item.price}
      </Text>
      <TouchableOpacity onPress={addItemInCart}>
        <Text className="paragraph-bold">Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
