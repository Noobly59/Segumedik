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
import SimplerDatePicker from "@cawfree/react-native-simpler-date-picker";
import useAuth from "../hooks/useAuth";
import { COLORS } from "../utils/constants";

export default function ProcessTalk(props) {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const { auth } = useAuth();

  const {
    route: { params },
  } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const { theme, guests, attendants, scheduledDate, comments } = formValue;
      setError("");
      const activity = [
        {
          id: null,
          occupationalSecurityReportId: params.reportId,
          planActivityId: params.planActivityId,
          status: 1,
          quantity: 0,
          title: theme,
          guests: guests,
          attendants: attendants,
          comments: comments,
          attachment: "",
          scheduledDate: moment(scheduledDate).format(),
        },
      ];
      navigation.navigate("TalkTakePicture", activity);
    },
  });

  const goBack = () => {
    navigation.navigate("SecAnnPlanProcessActivities");
  };

  moment.updateLocale("es", {
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
        {/* Tema */}
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Tema:</Text>

          <TextInput
            value={formik.values.theme}
            autoCapitalize="none"
            placeholder="Tema"
            onChangeText={(text) => formik.setFieldValue("theme", text)}
          />
          <Text style={styles.error}>{formik.errors.theme}</Text>
        </View>
        {/* Total Convocados */}
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Total convocados:</Text>
          <TextInput
            value={formik.values.guests}
            autoCapitalize="none"
            placeholder="Nº convocados"
            onChangeText={(text) => formik.setFieldValue("guests", text)}
            keyboardType="number-pad"
            rightContent={
              <Ionicons name="people" size={20} color={COLORS.primary} />
            }
          />
          <Text style={styles.error}>{formik.errors.guests}</Text>
        </View>
        {/* Total Asistentes */}
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Total asistentes:</Text>
          <TextInput
            value={formik.values.attendants}
            autoCapitalize="none"
            placeholder="Nº asistentes"
            keyboardType="number-pad"
            onChangeText={(text) => formik.setFieldValue("attendants", text)}
            rightContent={
              <Ionicons name="people" size={20} color={COLORS.primary} />
            }
          />
          <Text style={styles.error}>{formik.errors.attendants}</Text>
        </View>
        {/* Fecha */}
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Fecha:</Text>
          <Section style={styles.dateFormElement}>
            <SimplerDatePicker
              onDatePicked={(date) =>
                formik.setFieldValue("scheduledDate", date)
              }
            />
          </Section>
          <Text style={styles.error}>{formik.errors.scheduledDate}</Text>
        </View>
        {/* Comentarios */}
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Comentarios:</Text>
          <TextInput
            value={formik.values.comments}
            autoCapitalize="none"
            placeholder="Nº asistentes"
            onChangeText={(text) => formik.setFieldValue("comments", text)}
          />
          <Text style={styles.error}>{formik.errors.comments}</Text>
        </View>
        {/* Botones */}
        <View style={styles.formButtons}>
          <View>
            <Button
              text="Salir"
              type="TouchableOpacity"
              onPress={goBack}
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
            <Button
              text="Guardar"
              type="TouchableOpacity"
              onPress={formik.handleSubmit}
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
    theme: "",
    guests: "",
    attendants: "",
    scheduledDate: "",
    comments: "",
  };
}

function validationSchema() {
  return {
    theme: Yup.string().required("El tema es obligatorio"),
    guests: Yup.string().required("El total de convocados es obligatorio"),
    attendants: Yup.string().required("El total de asistentes es obligatorio"),
    scheduledDate: Yup.string().required("La fecha es obligatoria"),
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
