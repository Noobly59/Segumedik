import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import {
  Text,
  Picker,
  TextInput,
  themeColor,
  Button,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function AddSubstandarCondition() {
  const navigation = useNavigation();

  const goToAddSubConTakePicture = () => {
    navigation.navigate("AddSubConTakePicture");
  };
  const [headquarters, setHeadquarters] = useState(null);
  const [term, setTerm] = useState(null);
  const hqItems = [
    { label: "Guayaquil", value: "1" },
    { label: "Quito", value: "2" },
    { label: "Cuenca", value: "3" },
    { label: "Manta", value: "4" },
  ];
  const termItems = [
    { label: "Inmediatamente", value: "1" },
    { label: "Corto Plazo", value: "2" },
    { label: "Mediano Plazo", value: "3" },
    { label: "Largo Plazo", value: "4" },
  ];
  return (
    <KeyboardAvoidingView
      style={styles.formContainer}
      keyboardVerticalOffset={-250}
      enabled
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Sede:</Text>
          <Picker
            items={hqItems}
            value={headquarters}
            placeholder="Sede"
            onValueChange={(val) => setHeadquarters(val)}
          />
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Descripción:</Text>

          <TextInput
            // value={formik.values.username}
            autoCapitalize="none"
            placeholder="Descripción"
            // onChangeText={(text) => formik.setFieldValue("username", text)}
          />
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Fecha de detección:</Text>
          <TextInput
            // value={formik.values.username}
            autoCapitalize="none"
            placeholder="Fecha de detección"
            // onChangeText={(text) => formik.setFieldValue("username", text)}
            rightContent={
              <Ionicons
                name="calendar"
                size={20}
                color={themeColor.primary700}
              />
            }
          />
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Responsable:</Text>
          <TextInput
            // value={formik.values.username}
            autoCapitalize="none"
            placeholder="Responsable"
            // onChangeText={(text) => formik.setFieldValue("username", text)}
            rightContent={
              <Ionicons name="person" size={20} color={themeColor.primary700} />
            }
          />
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Plazo:</Text>
          <Picker
            items={termItems}
            value={term}
            placeholder="Plazo"
            onValueChange={(val) => setTerm(val)}
          />
        </View>
        <View style={styles.formButtons}>
          <View>
            <Button
              text="Salir"
              type="TouchableOpacity"
              onPress={navigation.goBack}
              status="danger"
              leftContent={
                <Ionicons
                  name="arrow-back-circle"
                  size={20}
                  color={themeColor.white}
                />
              }
            />
          </View>
          <View>
            <Button
              text="Continuar"
              type="TouchableOpacity"
              // onPress={formik.handleSubmit}
              onPress={goToAddSubConTakePicture}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 5,
  },
  formElement: {
    marginVertical: 7,
  },
  formLabel: {
    marginBottom: 3,
  },
  formButtons: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
