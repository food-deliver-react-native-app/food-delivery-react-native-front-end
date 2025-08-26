import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants";
import useAxios from "@/hooks/useAxios";
import { Category, MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    category: string;
    query: string;
  }>();

  const { data, refetch, loading } = useAxios<MenuItem[]>({
    url: "menu",
    config: {
      params: {
        category: category,
        query,
        limit: null,
      },
    },
  });

  const { data: categories } = useAxios({
    url: "categories",
  });

  useEffect(() => {
    refetch({ params: { category, query, limit: null } });
  }, [category, query]);

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
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start felx-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <SearchBar />
            <Filter categories={categories as Category[]} />
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && (
            <View className="flex-center">
              <Image
                className="size-full"
                resizeMode="contain"
                source={images.emptyState}
              />
              <Text className="h3-bold">Nothing matched your search</Text>
              <Text className="base-regular mt-2">
                Try a different search term or check for typos.
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;
