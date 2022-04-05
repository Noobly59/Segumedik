import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image } from "react-native";
import { themeColor, Button, Text, Section } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function AddSubConTakePicture() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const goToSubConDetail = () => {
    navigation.navigate("SubConDetail");
  };
  return (
    <View style={styles.pictureContainer}>
      <View>
        <Button
          text="Tomar Foto"
          type="TouchableOpacity"
          color={themeColor.primary600}
          rightContent={
            <Ionicons name="camera" size={20} color={themeColor.white} />
          }
        />
      </View>
      <View>
        <Image
          source={require("../assets/extintor.jpg")}
          style={{
            width: "63.75%",
            height: "85%",
            alignSelf: "center",
            top: 7,
          }}
        />
        {/* <Camera
          style={{
            width: "75%",
            height: "75%",
            alignSelf: "center",
            top: 7,
          }}
        ></Camera> */}
      </View>
      <View style={styles.formButtons}>
        <View>
          <Button
            text="Tomar Otra"
            type="TouchableOpacity"
            //   onPress={navigation.goBack}
            status="danger"
            leftContent={
              <Ionicons
                name="close-circle"
                size={20}
                color={themeColor.white}
              />
            }
          />
        </View>
        <View>
          <Button
            text="Aceptar"
            type="TouchableOpacity"
            // onPress={formik.handleSubmit}
            onPress={goToSubConDetail}
            color={themeColor.primary600}
            rightContent={
              <Ionicons
                name="arrow-forward-circle"
                size={20}
                color={themeColor.white}
              />
            }
          />
        </View>
      </View>
    </View>
    // <Camera style={{ flex: 1 }}></Camera>
  );
}

const styles = StyleSheet.create({
  pictureContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 7,
  },
  formButtons: {
    top: -60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
