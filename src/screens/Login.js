import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, themeColor } from "react-native-rapi-ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import { getUser } from "../api/user";
import { COLORS } from "../utils/constants";
import DatePicker from "../components/DatePicker/DatePicker";
import moment from "moment";

export default function Login() {
  const [error, setError] = useState("");
  const [date, setDate] = useState();
  const { login } = useAuth();

  useEffect(() => {
    console.log(date);
  }, [date]);

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
      const response = await getUserByUserName(username);
      if (response[0].userName !== "") {
        // console.log(response[0].userName);
        const user = [
          {
            userName: response[0].userName,
            companyId: "",
            companyName: "",
            headquarterId: "",
            name: "",
          },
        ];
        console.log("asdf");
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
            <Ionicons name="person" size={20} color={COLORS.primary} />
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
            <Ionicons name="lock-closed" size={20} color={COLORS.primary} />
          }
        />
      </View>
      <View style={styles.container}>
        <Button
          text="Iniciar Sesión"
          type="TouchableOpacity"
          onPress={formik.handleSubmit}
          color={COLORS.primary}
          leftContent={
            <Ionicons name="log-in" size={20} color={COLORS.white} />
          }
        />
      </View>
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
      <View style={{ paddingHorizontal: 4, flex: 1 }}>
        {/* <DatePicker
          setDate={setDate}
          minDate={"2012-07-02"}
          maxDate={"2022-01-15"}
        /> */}
      </View>
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
    color: COLORS.danger,
    marginTop: 10,
  },
});
