import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/auth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const { name, email, password } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!name || !email || !password)
      return Alert.alert(
        "Error",
        "email address & password & name is required!"
      );
    else if (!emailRegex) {
      return Alert.alert("Error", "Invalid email format");
    } else if (password.length < 8 || !hasSpecialSymbol) {
      return Alert.alert(
        "Error",
        "Password must be at least 8 characters long and contain a special symbol."
      );
    }
    setIsSubmitting(true);
    try {
      await createUser({
        name: name,
        email: email,
        password: password,
      });
      Alert.alert("Success", "User signed up successfuly");
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
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, name: text }));
        }}
        label="Full name"
      />
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
        title={"Sign Up"}
        onPress={submit}
      />
      <View className="flex justify-center mt-5 flex-row gap-2 items-center">
        <Text className="base-rebular text-gray-100">
          Already have an account ?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign in
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
