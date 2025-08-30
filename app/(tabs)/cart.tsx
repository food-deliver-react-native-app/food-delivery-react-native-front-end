import CartCard from "@/components/CartCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants";
import useCartStore from "@/store/cart.store";
import { CartItemType } from "@/type";
import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";

import CustomButton from "@/components/CustomButton";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React = require("react");

const Cart = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { items: data, fetchCart } = useCartStore();
  const pathname = usePathname();

  useEffect(() => {
    fetchCart();
  }, [pathname]);

  const [uncheckedIds, setUncheckedIds] = useState<Set<string>>(new Set());

  const toggleChecked = (id: string, newVal: boolean) => {
    setUncheckedIds((prev) => {
      const newSet = new Set(prev);
      if (newVal === false) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const checkedState = data.reduce(
    (acc, item) => {
      acc[item.id] = !uncheckedIds.has(item.id);
      return acc;
    },
    {} as { [key: string]: boolean }
  );

  const TotalPrice = Number(
    data
      .reduce((acc, item) => {
        if (!uncheckedIds.has(item.id)) {
          return acc + item.menu.price * item.quantity;
        }
        return acc;
      }, 0)
      .toFixed(2)
  );
  return (
    <SafeAreaView className="h-full">
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <CartCard
              key={item.id}
              isChecked={checkedState[item.id]}
              setIsChecked={(newVal) => toggleChecked(item.id, newVal)}
              item={item as CartItemType}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-5 px-5 pb-32"
        ListFooterComponent={() => (
          <View className="mb-32 mt-12">
            {data.length !== 0 && (
              <View>
                <View className="border p-4 rounded-2xl border-gray-100/20">
                  <Text className="h3-bold">Payment Summery</Text>
                  <View className="flex-row justify-between mt-4">
                    <View className="flex gap-y-6">
                      <Text className="paragraph-semibold text-gray-500">
                        Total Items ({data.length})
                      </Text>
                      <Text className="paragraph-semibold text-gray-500">
                        Delivery Fee
                      </Text>
                      <Text className="paragraph-semibold text-gray-500">
                        Discount
                      </Text>
                    </View>
                    <View className="flex  gap-y-6">
                      <Text className="paragraph-bold">${TotalPrice}</Text>
                      <Text className="paragraph-bold">Free</Text>
                      <Text className="paragraph-bold text-green-500">-0</Text>
                    </View>
                  </View>
                  <View className="border-t border-gray-100/20 my-8" />
                  <View className="flex-row justify-between mb-6">
                    <Text className="paragraph-bold">Total</Text>
                    <Text className="paragraph-bold">${TotalPrice}</Text>
                  </View>
                </View>
                <CustomButton
                  onPress={() => {
                    Alert.alert("your so cuteee", "nah nah nah");
                  }}
                  style={"mt-12 p-4"}
                  title="Order Now"
                />
              </View>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="w-full">
              <View className="flex-row justify-between">
                <TouchableOpacity onPress={() => router.back()}>
                  <Image source={images.arrowBack} className="size-6" />
                </TouchableOpacity>
                <View>
                  {isSearchActive ? (
                    <SearchBar />
                  ) : (
                    <TouchableOpacity onPress={() => setIsSearchActive(true)}>
                      <Image
                        source={images.search}
                        className="size-6"
                        resizeMode="contain"
                        tintColor="#5D5F6D"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View className="flex-row justify-between  gap-x-1 mt-5">
                <View>
                  <Text className="paragraph-bold  text-primary">
                    DELIVERY LOCATION
                  </Text>
                  <Text className="paragraph-semibold text-dark-100">Home</Text>
                </View>
                <TouchableOpacity>
                  <Text className="location-btn">Change Location</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-center">
            <Image
              className="size-full"
              resizeMode="contain"
              source={images.emptyState}
            />
            <Text className="h3-bold">Your cart is empty</Text>
            <Text className="base-regular mt-2">
              add items first, before checkout.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Cart;
