import SearchBar from "@/components/SearchBar";
import { images } from "@/constants";
import { router, Slot } from "expo-router";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

const _layout = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <View className="px-5 mt-12">
      <View className="my-5 gap-5 w-full">
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
      </View>
      <Slot />
    </View>
  );
};

export default _layout;
