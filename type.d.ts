import { ImageSourcePropType } from "react-native";
import { Models } from "react-native-appwrite";

export interface MenuItem extends Models.Document {
  name: string;
  id: string;
  price: number;
  image_url: string;
  description: string;
  calories: number;
  protein: number;
  rating: number;
  costumizations: CartCustomization[];
  category: Category;
  type: string;
}

export interface Category {
  name: string;
  id: string;
  description: string;
}

export interface User extends Models.Document {
  name: string;
  email: string;
  id: string;
  avatar: string;
}

export interface CartCustomization {
  id: string;
  name: string;
  price: number;
  type: string;
}

export type CartItemType = {
  id: string;
  menuId: string;
  quantity: number;
  menu: MenuItem;
  customizations?: {
    costumization: {
      id: string;
      name: string;
      price: number;
      type: string;
    };
  }[];
};

export type Customization = {
  [key: string]: string | boolean | number; // flexible for "extra cheese", "spicy sauce" etc.
};

export type CartItem = {
  id: string; // product id
  name: string;
  price: number;
  quantity: number;
  customizations?: Customization;
};

export interface CartStore {
  items: CartItemType[];
  addItem: (item: Omit<CartItemType, "quantity">) => void;
  removeItem: (id: string, customizations: CartCustomization[]) => void;
  increaseQty: (id: string, customizations: CartCustomization[]) => void;
  decreaseQty: (id: string, customizations: CartCustomization[]) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

interface PaymentInfoStripeProps {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
}

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  isLoading?: boolean;
}

interface CustomHeaderProps {
  title?: string;
}

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

interface ProfileFieldProps {
  label: string;
  value: string;
  icon: ImageSourcePropType;
}

interface CreateUserPrams {
  email: string;
  password: string;
  name: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface GetMenuParams {
  category: string;
  query: string;
}
