import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, KeyboardAvoidingView, Modal } from "react-native";
import {
  Text,
  Picker,
  TextInput,
  themeColor,
  Button,
  Section,
} from "react-native-rapi-ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import { COLORS } from "../utils/constants";
import DatePicker from "../components/DatePicker/DatePicker";

export default function AddSubstandarCondition() {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const { auth } = useAuth();
  // const hqItems = [
  //   { label: "Guayaquil", value: "1" },
  //   { label: "Quito", value: "2" },
  //   { label: "Cuenca", value: "3" },
  //   { label: "Manta", value: "4" },
  // ];

  const termItems = [
    { label: "Inmediatamente", value: 1 },
    { label: "Corto Plazo", value: 2 },
    { label: "Mediano Plazo", value: 3 },
    { label: "Largo Plazo", value: 4 },
  ];

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const { description, detectionDate, responsable, term } = formValue;
      setError("");
      const condition = [
        {
          conditionId: null,
          headquarterId: auth[0].headquarterId,
          description: description,
          detectionDate: moment(detectionDate).format(),
          detectionEvidence: null,
          responsible: responsable,
          closingDate: null,
          closingEvidence: null,
          deadline: term,
          conditionStatus: 1,
          createdBy: auth[0].userName,
          detectionOrientation: 0,
          closingOrientation: 0,
        },
      ];
      console.log(condition);
      navigation.navigate("AddSubConTakePicture", condition);
    },
  });

  const goToSubCon = () => {
    navigation.navigate("SubstandarCondition");
  };

  moment.updateLocale("en", {
    months:
      "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
        "_"
      ),
    monthsShort:
      "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_"),
  });

  return (
    <KeyboardAvoidingView
      style={styles.formContainer}
      keyboardVerticalOffset={-250}
      enabled
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.formElement}>
          <Text style={styles.formLabel}>Sede:</Text>
          <Picker
            items={hqItems}
            value={formik.values.hq}
            placeholder="Sede"
            onValueChange={(val) => {
              formik.setFieldValue("hq", val);
            }}
          />
        </View> */}
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Descripción:</Text>

          <TextInput
            value={formik.values.description}
            autoCapitalize="none"
            placeholder="Descripción"
            onChangeText={(text) => formik.setFieldValue("description", text)}
          />
          <Text style={styles.error}>{formik.errors.description}</Text>
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Fecha de detección:</Text>
          <DatePicker
            setDate={formik.setFieldValue}
            formikValue={"detectionDate"}
          />

          {/* <Section style={styles.dateFormElement}>
            <SimplerDatePicker
              onDatePicked={(date) =>
                formik.setFieldValue("detectionDate", date)
              }
            />
          </Section> */}
          {/* <TextInput
            value={formik.values.detectionDate}
            autoCapitalize="none"
            placeholder="Fecha de detección"
            onChangeText={(text) => formik.setFieldValue("detectionDate", text)}
            rightContent={
              <Ionicons
                name="calendar"
                size={20}
                color={themeColor.primary700}
              />
            }
          /> */}
          <Text style={styles.error}>{formik.errors.detectionDate}</Text>
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Responsable:</Text>
          <TextInput
            value={formik.values.responsable}
            autoCapitalize="none"
            placeholder="Responsable"
            onChangeText={(text) => formik.setFieldValue("responsable", text)}
            rightContent={
              <Ionicons name="person" size={20} color={COLORS.primary} />
            }
          />
          <Text style={styles.error}>{formik.errors.responsable}</Text>
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Plazo:</Text>
          <Picker
            items={termItems}
            value={formik.values.term}
            placeholder="Plazo"
            onValueChange={(val) => formik.setFieldValue("term", val)}
          />
          <Text style={styles.error}>{formik.errors.term}</Text>
        </View>
        <View style={styles.formButtons}>
          <View>
            <Button
              text="Salir"
              type="TouchableOpacity"
              onPress={goToSubCon}
              color={COLORS.danger}
              leftContent={
                <Ionicons
                  name="arrow-back-circle"
                  size={20}
                  color={COLORS.white}
                />
              }
            />
          </View>
          <View>
            {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}

            <Button
              text="Guardar"
              type="TouchableOpacity"
              onPress={formik.handleSubmit}
              // onPress={a}
              color={COLORS.primary}
              rightContent={
                <Ionicons
                  name="arrow-forward-circle"
                  size={20}
                  color={COLORS.white}
                />
              }
            />
          </View>
        </View>
        <Text style={styles.error}>{error}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function initialValues() {
  return {
    description: "",
    detectionDate: "",
    responsable: "",
    // hq: "",
    term: "",
  };
}

function validationSchema() {
  return {
    description: Yup.string().required("La descripción es obligatoria"),
    responsable: Yup.string().required("El responsable obligatorio"),
    detectionDate: Yup.string().required(
      "La fecha de detección es obligatoria"
    ),
    // hq: Yup.string().required("La sede es obligatoria"),
    term: Yup.string().required("El plazo es obligatorio"),
  };
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 5,
  },
  dateFormElement: {
    borderColor: "#d8d8d8",
    borderWidth: 1,
  },
  formElement: {
    marginVertical: 12,
  },
  formLabel: {
    marginBottom: 10,
  },
  formButtons: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    color: COLORS.danger,
    marginTop: 2,
  },
});
