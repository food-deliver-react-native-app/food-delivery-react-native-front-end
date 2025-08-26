import SearchBar from "@/components/SearchBar";
import { images } from "@/constants";
import useCartStore from "@/store/cart.store";
import cn from "clsx";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Cart = () => {
  const { items: data } = useCartStore();

  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View
              key={item.id}
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              {/* <MenuCard item={item as MenuItem} /> */}
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex justify-between flex-row w-full">
              <View className="flex-start">
                <TouchableOpacity onPress={() => router.back()}>
                  <Image source={images.arrowBack} className="size-6" />
                </TouchableOpacity>
                <View className="flex-start felx-row gap-x-1 mt-5">
                  <Text className="paragraph-semibold text-dark-100">
                    This is location area
                  </Text>
                </View>
              </View>
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
