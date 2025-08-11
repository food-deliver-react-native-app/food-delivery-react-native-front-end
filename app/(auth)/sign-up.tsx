import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SignUp = () => {
  return (
    <View>
      <Text>Sign Up</Text>
      <TouchableOpacity onPress={() => router.push("/sign-in")}>
        <Text className="text-blue-500 text-center">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
