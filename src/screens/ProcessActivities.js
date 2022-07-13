import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
} from "react-native";
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
import { cancelReportActivity } from "../api/securityAnnualPlans";

export default function ProcessActivities(props) {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const {
    route: { params },
  } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema(params.category)),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const { theme, scheduledDate, comments } = formValue;
      setError("");
      const activity = {
        id: null,
        occupationalSecurityReportId: params.reportId,
        planActivityId: params.planActivityId,
        status: 1,
        quantity: 1,
        title:
          params.category === 10
            ? "Insepección"
            : params.category === 15
            ? "Auditoría"
            : params.category === 16
            ? "Análisis de riesgo"
            : theme,
        guests: 0,
        attendants: 0,
        comments: comments,
        attachment: "",
        scheduledDate:
          params.category !== 16
            ? moment(scheduledDate).format()
            : moment().format(),
      };
      // console.log(activity);
      navigation.navigate("ActivityTakePicture", {
        activity: activity,
        params: params,
        // refresh: params.refresh,
      });
    },
  });

  const cancelActivity = async () => {
    setLoading(true);
    const response = await cancelReportActivity(
      params.planActivityId,
      params.reportId
    );
    setLoading(false);
    goBack();
  };

  const goToReschedule = () => {
    // console.log("act", params);
    navigation.navigate("RescheduleActivityScreen", {
      planActivityId: params.planActivityId,
    });
  };

  const goBack = () => {
    navigation.navigate("SecAnnPlanProcessActivities", {
      refresh: Math.random(),
    });
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
        {params.category !== 10 &&
          params.category !== 15 &&
          params.category !== 16 && (
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
          )}
        {/* Fecha */}
        {params.category !== 16 && (
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
        )}
        {/* Comentarios */}
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Comentarios:</Text>
          <TextInput
            value={formik.values.comments}
            autoCapitalize="none"
            placeholder="Comentarios"
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

        {loading ? (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color={COLORS.danger}
          />
        ) : (
          <View style={styles.footer}>
            <View style={{ marginVertical: 5 }}>
              <Button
                text="Reprogramar Actividad"
                color={COLORS.warning}
                onPress={goToReschedule}
                leftContent={
                  <Ionicons name="calendar" size={30} color={COLORS.white} />
                }
              />
            </View>

            <Button
              text="Cancelar Actividad"
              color={COLORS.danger}
              onPress={cancelActivity}
              leftContent={
                <Ionicons name="close-circle" size={30} color={COLORS.white} />
              }
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function initialValues() {
  return {
    theme: "",
    scheduledDate: "",
    comments: "",
  };
}

function validationSchema(category) {
  return {
    theme:
      category !== 10 && category !== 15 && category !== 16
        ? Yup.string().required("El tema es obligatorio")
        : Yup.string().optional(),
    scheduledDate:
      category !== 16
        ? Yup.string().required("La fecha es obligatoria")
        : Yup.string().optional(),
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
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    color: COLORS.danger,
    marginTop: 2,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 5,
  },
  spinner: {
    marginVertical: 10,
  },
});