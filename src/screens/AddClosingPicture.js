import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, AppState } from "react-native";
import { themeColor, Button, Text, TextInput } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { editSubCondition } from "../api/substandardConditions";
import { useFormik } from "formik";
import useAuth from "../hooks/useAuth";

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
      try {
        if (toggleCamera) {
          const closing = {
            recommendation: recommendation,
            closedBy: auth[0].userName,
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
        console.log(error);
      }
    },
  });
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
      <View style={{ top: -110 }}>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Recomendación:</Text>

          <TextInput
            value={formik.values.recommendation}
            autoCapitalize="none"
            placeholder="Descripción"
            onChangeText={(text) =>
              formik.setFieldValue("recommendation", text)
            }
          />
        </View>
        <View>
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
              onPress={formik.handleSubmit}
              // onPress={uploadCondition}
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
});
