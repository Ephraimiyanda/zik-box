/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#1d1716",
    background: "#e3e3e3",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    active: "#FF8700",
    fadeColor: "#d3d6db",
    faintText: "#BCBCBC",
    tabColor: "#d3d6db",
  },
  dark: {
    text: "#ffff",
    background: "#1E1E1E",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    active: "#FF8700",
    fadeColor: "#3A3F47",
    faintText: "#BCBCBC",
    tabColor: "#3A3F47",
  },
  active: "#FF8700",
  white: "#ffff",
  translucent: "rgba(255, 255, 255, 0.2)",
};
