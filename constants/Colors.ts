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
    active: "#FF3D00",
    fadeColor: "#d3d6db",
    faintText: "#BBBBBB",
    tabColor: "#d3d6db",
  },
  dark: {
    text: "#ffff",
    background: "#15141F",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    active: "#FF3D00",
    fadeColor: "#211F30",
    faintText: "#BBBBBB",
    tabColor: "#211F30",
  },
  active: "#FF3D00",
  white: "#ffff",
};
