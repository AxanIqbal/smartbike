import * as React from "react"
import { Image, ImageStyle, StyleProp, View } from "react-native"
import Animated, {
  BounceInUp,
  FadeIn,
  FadeOut,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

export interface BatteryProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style: StyleProp<ImageStyle>
  isCharging: boolean
  percentage: number
}

// const CONTAINER: ViewStyle = {
//   image
// }

const BAR1: ImageStyle = {
  position: "absolute",
  bottom: 15,
  left: 13,
  width: 75,
  height: 19,
}

const BAR2: ImageStyle = {
  ...BAR1,
  bottom: 36,
}

const BAR3: ImageStyle = {
  ...BAR1,
  bottom: 57,
}

const BAR4: ImageStyle = {
  ...BAR1,
  bottom: 78,
}

const BAR5: ImageStyle = {
  ...BAR1,
  bottom: 99,
}

const BAR6: ImageStyle = {
  ...BAR1,
  bottom: 119,
}

/**
 * Describe your component here
 */
export function Battery(props: BatteryProps) {
  const { style, isCharging, percentage } = props
  const blink = useSharedValue(0)

  // useCode(
  //   () =>
  //     set(
  //       blink,
  //       loop({
  //         reset(): void {
  //         }, start(callback: Animated.EndCallback | undefined): void {
  //         }, stop(): void {
  //         },
  //         duration: 1000,
  //         easing: Easing.inOut(Easing.ease),
  //
  //         // the animation goes from 0 to 1 and then
  //         // from 1 to 0 in the next cycle
  //         boomerang: true,
  //         autoStart: true
  //       })
  //     ),
  //   [blink]
  // );
  const animatedChargingStyles = useAnimatedStyle(() => {
    if (isCharging) {
      blink.value = withRepeat(withTiming(1, { duration: 500 }), 20, true)
      // blink.value = withRepeat(withTiming(0, { duration: 500 }))
    } else {
      blink.value = 1
    }
    return {
      opacity: blink.value,
    }
  })

  return (
    <View>
      <Image source={require("./battery.png")} style={style} />
      {/* {isCharging ? ( */}
      {/*   <Animated.Image */}
      {/*     source={require("./bar_red_1.png")} */}
      {/*     resizeMode={"stretch"} */}
      {/*     style={[BAR1, animatedChargingStyles]} */}
      {/*   /> */}
      {/* ) : ( */}
      {/*   <Image source={require("./bar_full.png")} resizeMode={"stretch"} style={BAR1} /> */}
      {/* )} */}
      {percentage <= 16 && (
        <Animated.Image
          source={require("./bar_red_1.png")}
          entering={FadeIn}
          exiting={FadeOut}
          resizeMode={"stretch"}
          style={[BAR1, animatedChargingStyles]}
        />
      )}
      {percentage > 16 && (
        <Animated.Image
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout.springify()}
          source={require("./bar_full.png")}
          resizeMode={"stretch"}
          style={BAR1}
        />
      )}
      {percentage > 32 && (
        <Animated.Image
          entering={BounceInUp}
          exiting={FadeOut}
          layout={Layout.springify()}
          source={require("./bar_full.png")}
          resizeMode={"stretch"}
          style={BAR2}
        />
      )}
      {percentage > 48 && (
        <Animated.Image
          source={require("./bar_battery_1.png")}
          entering={BounceInUp}
          exiting={FadeOut}
          resizeMode={"stretch"}
          style={BAR3}
        />
      )}
      {percentage > 64 && (
        <Animated.Image
          entering={BounceInUp}
          exiting={FadeOut}
          source={require("./bar_battery_2.png")}
          resizeMode={"stretch"}
          style={BAR4}
        />
      )}
      {percentage > 80 && (
        <Animated.Image
          entering={BounceInUp}
          exiting={FadeOut}
          source={require("./bar_battery_3.png")}
          resizeMode={"stretch"}
          style={BAR5}
        />
      )}
      {percentage > 96 && (
        <Animated.Image
          source={require("./bar_full.png")}
          entering={BounceInUp}
          exiting={FadeOut}
          resizeMode={"stretch"}
          style={BAR6}
        />
      )}
    </View>
  )
}
