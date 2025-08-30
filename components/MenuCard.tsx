import useCartStore from "@/store/cart.store";
import { MenuItem } from "@/type";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { addItem, items } = useCartStore();
  const addItemInCart = async () => {
    await addItem({
      menuId: item.id,
      quantity: 1,
      customizations: [],
    });
  };

  const handleIsCart = (id: string) => {
    return items.some((item) => item.menu.id === id);
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: item.id },
        })
      }
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
      <TouchableOpacity
        disabled={handleIsCart(item.id)}
        onPress={addItemInCart}
      >
        <Text
          className={cn(
            "paragraph-bold",
            handleIsCart(item.id) && "text-primary"
          )}
        >
          {handleIsCart(item.id) ? "in Cart" : "Add to Cart"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
