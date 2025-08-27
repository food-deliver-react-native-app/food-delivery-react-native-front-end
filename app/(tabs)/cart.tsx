import CartCard from "@/components/CartCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants";
import useCartStore from "@/store/cart.store";
import { CartItemType } from "@/type";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import cn = require("clsx");
import React = require("react");

const Cart = () => {
  const { items: data, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <SafeAreaView className="h-full">
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View key={item.id}>
              <CartCard item={item as CartItemType} />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-5 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className=" w-full">
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
        // ListEmptyComponent={() =>
        //   !loading && (
        //     <View className="flex-center">
        //       <Image
        //         className="size-full"
        //         resizeMode="contain"
        //         source={images.emptyState}
        //       />
        //       <Text className="h3-bold">Nothing matched your search</Text>
        //       <Text className="base-regular mt-2">
        //         Try a different search term or check for typos.
        //       </Text>
        //     </View>
        //   )
        // }
      />
    </SafeAreaView>
  );
};

export default Cart;
