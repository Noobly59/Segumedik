import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Image,
  AppState,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { saveSubCondition } from "../api/substandardConditions";
import { COLORS, IMAGE_SIZE, IMAGE_QUALITY } from "../utils/constants";
import { manipulateAsync } from "expo-image-manipulator";

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
  const [orientation, setOrientation] = useState(null);
  const [loading, setLoading] = useState(false);

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
        // const options = {

        // exif: true,
        // };
        // const rotatedPicture = await manipulateAsync(picture.uri, [
        //   { rotate: -90 },
        // ]);
        // setImageUri(rotatedPicture.uri);
        let picture = await cameraRef.current.takePictureAsync({
          quality: IMAGE_QUALITY,
        });
        setImageUri(picture.uri);
        toggle();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const uploadCondition = async () => {
    setLoading(true);
    try {
      if (toggleCamera) {
        const condition = [...params];
        let formData = new FormData();
        formData.append("file", {
          uri: imageUri,
          name: "detection.jpg",
          type: "image/jpg",
        });
        condition[0].detectionOrientation = orientation ? orientation : 1;
        formData.append("condition", {
          string: JSON.stringify(condition[0]),
          type: "application/json",
        });
        const response = await saveSubCondition(formData);
        setLoading(false);
        navigation.navigate("SubConDetail", response);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const rotateRight = async () => {
    const picture = await manipulateAsync(imageUri, [{ rotate: 90 }]);
    // console.log(picture);
    picture.width > picture.height ? setOrientation(2) : setOrientation(1);
    setImageUri(picture.uri);
    // console.log(orientation);
  };
  const rotateLeft = async () => {
    const picture = await manipulateAsync(imageUri, [{ rotate: -90 }]);
    // console.log(picture);
    picture.width > picture.height ? setOrientation(2) : setOrientation(1);
    setImageUri(picture.uri);
    // console.log(orientation);
  };
  return (
    <View style={styles.container}>
      <View style={styles.pictureContainer}>
        {toggleCamera ? (
          <Image
            source={{ uri: imageUri }}
            resizeMode="contain"
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
            pictureSize={IMAGE_SIZE}
            ref={cameraRef}
          ></Camera>
        )}
      </View>
      <View style={{ marginTop: "auto" }}>
        {pictureTaken ? (
          <>
            <View style={styles.rotateButtons}>
              <TouchableOpacity
                style={styles.rotate}
                activeOpacity={0.5}
                onPress={rotateLeft}
              >
                <Ionicons
                  name="arrow-undo-circle"
                  size={30}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rotate}
                activeOpacity={0.5}
                onPress={rotateRight}
              >
                <Ionicons
                  name="arrow-redo-circle"
                  size={30}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 20 }}>
              <Button
                text="Tomar Otra"
                type="TouchableOpacity"
                color={COLORS.primary}
                onPress={toggle}
                leftContent={
                  <Ionicons name="camera" size={30} color={COLORS.white} />
                }
              />
            </View>
          </>
        ) : (
          <View>
            <Button
              text="Tomar Foto"
              type="TouchableOpacity"
              color={COLORS.primary}
              onPress={takePicture}
              rightContent={
                <Ionicons name="camera" size={30} color={COLORS.white} />
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
            color={COLORS.danger}
            leftContent={
              <Ionicons
                name="arrow-back-circle"
                size={30}
                color={COLORS.white}
              />
            }
          />
        </View>
        {toggleCamera ? (
          loading ? (
            <ActivityIndicator
              size="large"
              style={styles.spinner}
              color={COLORS.primary}
            />
          ) : (
            <View>
              <Button
                text="Guardar"
                type="TouchableOpacity"
                // onPress={formik.handleSubmit}
                onPress={uploadCondition}
                color={COLORS.primary}
                rightContent={
                  <Ionicons
                    name="arrow-forward-circle"
                    size={30}
                    color={COLORS.white}
                  />
                }
              />
            </View>
          )
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
    // marginTop: "auto",
    marginVertical: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rotateButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rotate: {
    backgroundColor: COLORS.primary,
    marginVertical: 5,
    padding: 7,
    borderRadius: 30,
  },
  spinner: {
    marginVertical: 10,
  },
});
