import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, themeColor } from "react-native-rapi-ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import { getUser } from "../api/user";

export default function Login() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const getUserByUserName = async (username) => {
    try {
      const response = await getUser(username);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setError("");
      const { username, password } = formValue;
      const user = await getUserByUserName(username);
      if (user.userName !== "") {
        console.log(user.userName);
        login(user);
      } else {
        setError("El usuario no existe");
      }
    },
  });

  return (
    <>
      <View style={styles.container}>
        <TextInput
          value={formik.values.username}
          autoCapitalize="none"
          placeholder="Usuario"
          onChangeText={(text) => formik.setFieldValue("username", text)}
          leftContent={
            <Ionicons name="person" size={20} color={themeColor.primary700} />
          }
        />
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Contraseña"
          autoCapitalize="none"
          value={formik.values.password}
          secureTextEntry={true}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          leftContent={
            <Ionicons
              name="lock-closed"
              size={20}
              color={themeColor.primary700}
            />
          }
        />
      </View>
      <View style={styles.container}>
        <Button
          text="Iniciar Sesión"
          type="TouchableOpacity"
          onPress={formik.handleSubmit}
          leftContent={
            <Ionicons name="log-in" size={20} color={themeColor.white} />
          }
        />
      </View>
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
    </>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("El ususario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 10,
  },
});
