import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, AppState } from "react-native";
import { themeColor, Button, Text } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { saveSubCondition } from "../api/substandardConditions";

export default function AddSubConTakePicture(props) {
  const {
    route: { params },
  } = props;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const navigation = useNavigation();
  const [toggleCamera, setToggleCamera] = useState(false);
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [pictureTaken, setPictureTaken] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggle = () => {
    setToggleCamera(!toggleCamera);
    setPictureTaken(!pictureTaken);
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        let picture = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setImageUri(picture.uri);
        toggle();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const uploadCondition = async () => {
    try {
      if (toggleCamera) {
        const condition = [...params];
        let formData = new FormData();
        formData.append("file", {
          uri: imageUri,
          name: "detection.jpg",
          type: "image/jpg",
        });
        formData.append("condition", {
          string: JSON.stringify(condition[0]),
          type: "application/json",
        });
        const response = await saveSubCondition(formData);
        navigation.navigate("SubConDetail", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pictureContainer}>
        {toggleCamera ? (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: "90%",
              height: "90%",
              alignSelf: "center",
              top: 7,
            }}
          />
        ) : appStateVisible === "background" ? (
          <></>
        ) : (
          <Camera
            style={{
              width: "90%",
              height: "90%",
              alignSelf: "center",
              top: 7,
            }}
            ref={cameraRef}
          ></Camera>
        )}
      </View>
      <View style={{ top: -90 }}>
        {pictureTaken ? (
          <View>
            <Button
              text="Tomar Otra"
              type="TouchableOpacity"
              color={themeColor.primary600}
              onPress={toggle}
              leftContent={
                <Ionicons name="camera" size={30} color={themeColor.white} />
              }
            />
          </View>
        ) : (
          <View>
            <Button
              text="Tomar Foto"
              type="TouchableOpacity"
              color={themeColor.primary600}
              onPress={takePicture}
              rightContent={
                <Ionicons name="camera" size={30} color={themeColor.white} />
              }
            />
          </View>
        )}
      </View>

      <View style={styles.formButtons}>
        <View>
          <Button
            text="Volver"
            type="TouchableOpacity"
            onPress={navigation.goBack}
            status="danger"
            leftContent={
              <Ionicons
                name="arrow-back-circle"
                size={30}
                color={themeColor.white}
              />
            }
          />
        </View>
        {toggleCamera ? (
          <View>
            <Button
              text="Guardar"
              type="TouchableOpacity"
              // onPress={formik.handleSubmit}
              onPress={uploadCondition}
              color={themeColor.primary600}
              rightContent={
                <Ionicons
                  name="arrow-forward-circle"
                  size={30}
                  color={themeColor.white}
                />
              }
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 7,
  },
  pictureContainer: {},
  formButtons: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
