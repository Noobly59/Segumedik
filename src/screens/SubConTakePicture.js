import React, { useRef, useState, useEffect } from "react";
import { View, Text, AppState } from "react-native";
import { Camera } from "expo-camera";

export default function SubConTakePicture() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    // if (
    //   appState.current.match(/inactive|background/) &&
    //   nextAppState === "active"
    // ) {
    //   console.log("App has come to the foreground!");
    // }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    // console.log("AppState", appState.current);
  };

  return (
    <View style={{ flex: 1 }}>
      {appStateVisible === "background" ? (
        <Text>SubConTakePicture</Text>
      ) : (
        <View
          style={{
            padding: 17,
          }}
        >
          <Camera
            style={{
              width: "100%",
              height: "87%",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "white" }}>sadasdasd</Text>
          </Camera>
        </View>
      )}
    </View>
  );
}
