import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
        {leftIcon}
      <Text>CustomButton</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
