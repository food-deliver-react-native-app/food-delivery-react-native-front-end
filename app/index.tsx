import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl hover:scale-110   transition duration-300  ease-in-out hover:cursor-pointer  font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
