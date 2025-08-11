import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SignIn = () => {
  return (
    <View>
      <Text>Sign In</Text>
      <TouchableOpacity onPress={() => router.push("/sign-up")}>
        <Text className="text-blue-500 text-center">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
