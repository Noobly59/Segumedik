import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Image,
  AppState,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { themeColor, Button, Text, TextInput } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { manipulateAsync } from "expo-image-manipulator";
import { editSubCondition } from "../api/substandardConditions";
import { useFormik } from "formik";
import useAuth from "../hooks/useAuth";
import { COLORS, IMAGE_SIZE, IMAGE_QUALITY } from "../utils/constants";

export default function AddClosingPicture(props) {
  const {
    route: { params },
  } = props;
  // console.log(params.id);
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

  const { auth } = useAuth();

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
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const { recommendation } = formValue;
      setLoading(true);
      try {
        if (toggleCamera) {
          const closing = {
            recommendation: recommendation,
            closedBy: auth[0].userName,
            closingOrientation: orientation ? orientation : 1,
          };
          let formData = new FormData();
          formData.append("file", {
            uri: imageUri,
            name: "closing.jpg",
            type: "image/jpg",
          });
          formData.append("closing", {
            string: JSON.stringify(closing),
            type: "application/json",
          });
          console.log(formData);
          const response = await editSubCondition(params.id, formData);
          navigation.navigate("SubConDetail", response);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });
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

  const rotateRight = async () => {
    const picture = await manipulateAsync(imageUri, [{ rotate: 90 }]);
    picture.width > picture.height ? setOrientation(2) : setOrientation(1);
    setImageUri(picture.uri);
    // console.log(orientation);
  };
  const rotateLeft = async () => {
    const picture = await manipulateAsync(imageUri, [{ rotate: -90 }]);
    picture.width > picture.height ? setOrientation(2) : setOrientation(1);
    setImageUri(picture.uri);
    // console.log(orientation);
  };

  return (
    <SafeAreaView style={styles.container}>
      {pictureTaken ? (
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Recomendación:</Text>

          <TextInput
            value={formik.values.recommendation}
            autoCapitalize="none"
            placeholder="Recomendación"
            onChangeText={(text) =>
              formik.setFieldValue("recommendation", text)
            }
          />
        </View>
      ) : (
        <></>
      )}
      <View style={styles.pictureContainer}>
        {toggleCamera ? (
          <Image
            source={{ uri: imageUri }}
            resizeMode="contain"
            style={{
              width: "85%",
              height: "85%",
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
      <View style={{ top: -90 }}>
        <View>
          {pictureTaken ? (
            <View style={{ top: -30 }}>
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
              <View>
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
            </View>
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
                onPress={formik.handleSubmit}
                // onPress={uploadCondition}
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
    </SafeAreaView>
  );
}

function initialValues() {
  return {
    recommendation: "",
  };
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
  formElement: {
    marginVertical: 12,
  },
  formLabel: {
    marginBottom: 10,
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
