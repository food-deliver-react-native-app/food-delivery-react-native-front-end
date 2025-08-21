import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/auth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!email || !password) {
      return Alert.alert(
        "Error",
        "Please enter valid email address & password."
      );
    } else if (!emailRegex) {
      return Alert.alert("Error", "Invalid email format");
    } else if (password.length < 8 || !hasSpecialSymbol) {
      return Alert.alert(
        "Error",
        "Password must be at least 8 characters long and contain a special symbol."
      );
    }
    setIsSubmitting(true);
    try {
      await signIn({ email, password });
      Alert.alert("Success", "User signed in successfuly");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, email: text }));
        }}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, password: text }));
        }}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton
        isLoading={isSubmitting}
        title={"Sign In"}
        onPress={submit}
      />
      <View className="flex justify-center mt-5 flex-row gap-2 items-center">
        <Text className="base-rebular text-gray-100">
          Don&apos; t have an account ?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
