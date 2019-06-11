import React from "react";
import { Animated, View, Text, DeviceInfo, Button } from "react-native";

const Item = ({ children }) => (
  <View
    style={{
      height: 200,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#e4e4e4",
      margin: 10
    }}
  >
    <Text>{children + 1}</Text>
  </View>
);

const SAFE_INSET_TOP = DeviceInfo.isIPhoneX_deprecated ? 44 : 20;
const HEADER_HEIGHT = 300;
const SEARCH_HEIGHT = 45;
const PADDING = 20;
const HEADER_DELTA = HEADER_HEIGHT - (SEARCH_HEIGHT + PADDING + SAFE_INSET_TOP);

const App = ({ handleSwitch }) => {
  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_DELTA],
    outputRange: [0, -HEADER_DELTA],
    extrapolate: "clamp"
  });

  return (
    <>
      <Animated.View
        style={{
          height: HEADER_HEIGHT,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transform: [{ translateY }],
          backgroundColor: "#222",
          padding: PADDING,
          zIndex: 2
        }}
      >
        <View style={{ marginTop: 50 }}>
          <Button title="Switch to reanimated" onPress={handleSwitch} />
        </View>
        <View
          style={{
            marginTop: "auto",
            height: SEARCH_HEIGHT,
            borderRadius: SEARCH_HEIGHT / 2,
            backgroundColor: "#fff",
            justifyContent: "center",
            paddingHorizontal: 20
          }}
        >
          <Text>Search bar</Text>
        </View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }
          ],
          {
            useNativeDriver: true
          }
        )}
      >
        {[...Array(20)].map((index, nr) => (
          <Item key={nr}>{nr}</Item>
        ))}
      </Animated.ScrollView>
    </>
  );
};

export default App;
