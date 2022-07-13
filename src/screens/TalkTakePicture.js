import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
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
import { completeActivity } from "../api/securityAnnualPlans";
import { COLORS, IMAGE_SIZE, IMAGE_QUALITY } from "../utils/constants";
import { manipulateAsync } from "expo-image-manipulator";

export default function TalkTakePicture(props) {
  //AUTH
  const { auth } = useAuth();

  //NAVEGACION
  const navigation = useNavigation();
  const {
    route: { params },
  } = props;

  //CAMARA
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [toggleCamera, setToggleCamera] = useState(false);
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [pictureTaken, setPictureTaken] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  //VARIOS
  const [orientation, setOrientation] = useState(null);
  const [loading, setLoading] = useState(false);

  //CAMARA
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

  //ACTIVAR CAMARA
  const toggle = () => {
    setToggleCamera(!toggleCamera);
    setPictureTaken(!pictureTaken);
  };

  //TOMAR FOTO
  const takePicture = async () => {
    if (cameraRef) {
      try {
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

  //ROTACION
  const rotateRight = async () => {
    const picture = await manipulateAsync(imageUri, [{ rotate: 90 }]);
    picture.width > picture.height ? setOrientation(2) : setOrientation(1);
    setImageUri(picture.uri);
  };
  const rotateLeft = async () => {
    const picture = await manipulateAsync(imageUri, [{ rotate: -90 }]);
    picture.width > picture.height ? setOrientation(2) : setOrientation(1);
    setImageUri(picture.uri);
  };

  //SUBIR ACTIVIDAD
  const uploadActivity = async () => {
    setLoading(true);
    try {
      if (toggleCamera) {
        const activity = params.activity;
        let formData = new FormData();
        formData.append("file", {
          uri: imageUri,
          name: "detection.jpg",
          type: "image/jpg",
        });
        formData.append("activity", {
          string: JSON.stringify(activity),
          type: "application/json",
        });
        // console.log(activity);
        const response = await completeActivity(formData, auth[0].userName);
        setLoading(false);
        navigation.navigate("SecAnnPlanProcessActivities", {
          refresh: Math.random(),
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
                onPress={uploadActivity}
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
