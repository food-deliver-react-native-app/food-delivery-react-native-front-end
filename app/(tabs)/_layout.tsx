import { Redirect, Slot } from "expo-router";
import React from "react";

export default function _layout() {
  const isAuthentificated = true;
  if (!isAuthentificated) return <Redirect href="/sign-in" />;
  return <Slot />;
}
