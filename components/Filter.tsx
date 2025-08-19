import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || "");

  const filterData: (Category | { id: string; name: string })[] = categories
    ? [{ id: "all", name: "All" }, ...categories]
    : [{ id: "all", name: "All" }];

  const handePress = (id: string) => {
    setActive(id);
    if (id === "all") router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  return (
    <FlatList
      data={filterData}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      renderItem={({ item, index }) => (
        <TouchableOpacity
          key={index}
          className={cn(
            "filter",
            active === item.id ? "bg-amber-500" : "bg-white"
          )}
          style={
            Platform.OS === "android"
              ? { elevation: 5, shadowColor: "#878787" }
              : {}
          }
          onPress={() => handePress(item.id)}
        >
          <Text
            className={cn(
              "body-medium",
              active === item.id ? "text-white" : "text-gray-200"
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    >
      <Text>SearchBar</Text>
    </FlatList>
  );
};

export default Filter;
