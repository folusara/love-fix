import { Dimensions } from "react-native";

import { moderateScale, scale, verticalScale } from "react-native-size-matters";

/**
 * Single place that adapts the design (drawn at ~390pt iPhone width) to every screen.
 * moderateScale grows sizes only partially with screen width, so text and spacing
 * stay balanced on both small Androids and large phones instead of ballooning.
 */
export const ms = (size: number, factor = 0.4) =>
  Math.round(moderateScale(size, factor));
export const hs = (size: number) => Math.round(scale(size));
export const vs = (size: number) => Math.round(verticalScale(size));

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

/** Fraction of the screen height, clamped so heroes never dominate tiny or huge screens. */
export const screenFraction = (fraction: number, min: number, max: number) =>
  Math.round(Math.min(Math.max(SCREEN_HEIGHT * fraction, min), max));
