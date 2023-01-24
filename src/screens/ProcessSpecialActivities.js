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
import useAuth from "../hooks/useAuth";
import { COLORS } from "../utils/constants";
import {
  cancelReportActivity,
  completeSpecialActivity,
} from "../api/securityAnnualPlans";
import DatePicker from "../components/DatePicker/DatePicker";

export default function ProcessSpecialActivities(props) {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    route: { params },
  } = props;

  const activityIdArray = {
    accident: "5e13f534-ec49-48c0-9f39-5cad1f251da9",
    roster: "9ce8b60e-05e6-4e06-9110-b63e9e501985",
    professionogram: "18df8028-f0c0-4e19-ad9c-a7879a166602",
    risk: "003efb3b-3c61-46a6-99fe-83366e266fcc",
    talk: "8881ca10-d9a3-4731-9bc2-3e756ffb31d4",
    training: "fa7f5478-80a7-4e8a-81cc-0aa7a14e3d68",
    service: "302bf66f-863d-4b07-820c-d077035ac42e",
    audit: "ccd8e722-b525-4ba8-abbe-a4eae562460a",
    observations: "31b39761-494e-466c-9837-803824436447",
    conditions: "32d8071c-6351-4b71-b87b-81a317d3dea3",
    riskAttachment: "bd8120a4-9afb-4dd8-937b-e6f67c41fd48",
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(
      validationSchema(params.activityId, activityIdArray)
    ),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const { quantity, guests, attendants, scheduledDate, comments } =
        formValue;
      setError("");
      const activity = {
        id: null,
        occupationalSecurityReportId: params.reportId,
        planActivityId: params.planActivityId,
        status: 1,
        quantity:
          params.activityId == activityIdArray.conditions ? 1 : quantity,
        title:
          params.activityId == activityIdArray.talk
            ? "Charla Medio Ambiente"
            : params.activityId == activityIdArray.riskAttachment
            ? "Elaboración de Matrices de Riesgo"
            : params.activityId == activityIdArray.observations
            ? "Observación Planeada"
            : params.activityId == activityIdArray.audit
            ? "Gestión de Auditorías"
            : params.activityId == activityIdArray.service
            ? "Ordenes de Servicio"
            : params.activityId == activityIdArray.training
            ? "Entrenamientos"
            : params.activityId == activityIdArray.accident
            ? "Control de accidentes"
            : params.activityId == activityIdArray.professionogram
            ? "Profesiogramas"
            : params.activityId == activityIdArray.roster
            ? "Control de nómina"
            : params.activityId == activityIdArray.risk
            ? "Control de matrices"
            : "Otros",
        guests:
          params.activityId == activityIdArray.conditions ||
          params.activityId == activityIdArray.talk
            ? guests
            : 0,
        attendants:
          params.activityId == activityIdArray.conditions ||
          params.activityId == activityIdArray.talk ||
          params.activityId == activityIdArray.training ||
          params.activityId == activityIdArray.observations
            ? attendants
            : 0,
        comments: comments,
        attachment: "",
        scheduledDate:
          params.activityId == activityIdArray.accident ||
          params.activityId == activityIdArray.roster ||
          params.activityId == activityIdArray.professionogram ||
          params.activityId == activityIdArray.risk
            ? moment().format()
            : moment(scheduledDate).format(),
      };
      // console.log(activity);
      params.activityId == activityIdArray.observations
        ? goToTakePicture(activity, params)
        : params.activityId == activityIdArray.audit
        ? goToTakePicture(activity, params)
        : params.activityId == activityIdArray.conditions
        ? goToTakePicture(activity, params)
        : params.activityId == activityIdArray.service
        ? goToTakePicture(activity, params)
        : params.activityId == activityIdArray.riskAttachment
        ? goToTakePicture(activity, params)
        : (setLoading(true),
          completeSpecialActivity(activity, () => {
            goBack();
          }));
    },
  });

  const goToTakePicture = (activity, params) => {
    navigation.navigate("ActivityTakePicture", {
      activity: activity,
      params: params,
      // refresh: params.refresh,
    });
  };

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

  moment.updateLocale("en", {
    months:
      "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
        "_"
      ),
    monthsShort:
      "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_"),
  });

  const inputLabels = (type, id) => {
    switch (id) {
      case activityIdArray.conditions:
      case activityIdArray.talk:
        if (type === "quantity") {
          return "Charlas realizadas en el mes:";
        } else if (type === "attendants") {
          return "Total Asistentes:";
        }
      case activityIdArray.riskAttachment:
        if (type === "quantity") {
          return "Matrices realizadas en el mes:";
        }
      case activityIdArray.observations:
        if (type === "quantity") {
          return "Actividades realizadas en el mes:";
        } else if (type === "attendants") {
          return "Personas Conformes:";
        }
      case activityIdArray.audit:
        if (type === "quantity") {
          return "Auditorías realizadas en el mes:";
        }
      case activityIdArray.service:
        if (type === "quantity") {
          return "Número de órdenes realizadas en el mes:";
        }
      case activityIdArray.training:
        if (type === "quantity") {
          return "Entrenamientos realizados en el mes:";
        } else if (type === "attendants") {
          return "Número de empleados entrenados en el mes:";
        }
      case activityIdArray.accident:
        if (type === "quantity") {
          return "Accidentes registrados en el mes:";
        }
      case activityIdArray.professionogram:
        if (type === "quantity") {
          return "Número de profesiogramas realizadas en el mes:";
        }
      case activityIdArray.roster:
        if (type === "quantity") {
          return "Empleados registrados en nómina en el mes:";
        }
      case activityIdArray.risk:
        if (type === "quantity") {
          return "Número de matrices realizadas en el mes:";
        }
      default:
        return "Cantidad:";
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.formContainer}
      keyboardVerticalOffset={-250}
      enabled
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cantidad */}
        {params.activityId == activityIdArray.conditions ? (
          <></>
        ) : (
          <View style={styles.formElement}>
            <Text style={styles.formLabel}>
              {inputLabels("quantity", params.activityId)}
            </Text>
            <TextInput
              value={formik.values.quantity}
              autoCapitalize="none"
              placeholder="Nº"
              onChangeText={(text) => formik.setFieldValue("quantity", text)}
              keyboardType="number-pad"
              rightContent={
                <Ionicons name="people" size={20} color={COLORS.primary} />
              }
            />
            <Text style={styles.error}>{formik.errors.quantity}</Text>
          </View>
        )}

        {/* Invitados */}
        {params.activityId == activityIdArray.conditions ||
        params.activityId == activityIdArray.talk ? (
          <View style={styles.formElement}>
            <Text style={styles.formLabel}>Total convocados:</Text>
            <TextInput
              value={formik.values.guests}
              autoCapitalize="none"
              placeholder="Nº"
              onChangeText={(text) => formik.setFieldValue("guests", text)}
              keyboardType="number-pad"
              rightContent={
                <Ionicons name="people" size={20} color={COLORS.primary} />
              }
            />
            <Text style={styles.error}>{formik.errors.guests}</Text>
          </View>
        ) : (
          <></>
        )}

        {/* Asistentes */}
        {params.activityId == activityIdArray.conditions ||
        params.activityId == activityIdArray.talk ||
        params.activityId == activityIdArray.training ||
        params.activityId == activityIdArray.observations ? (
          <View style={styles.formElement}>
            <Text style={styles.formLabel}>
              {inputLabels("attendants", params.activityId)}
            </Text>
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
        ) : (
          <></>
        )}

        {/* Fecha */}
        {params.activityId == activityIdArray.accident ||
        params.activityId == activityIdArray.roster ||
        params.activityId == activityIdArray.professionogram ||
        params.activityId == activityIdArray.risk ? (
          <></>
        ) : (
          <View style={styles.formElement}>
            <Text style={styles.formLabel}>Fecha:</Text>
            <DatePicker
              setDate={formik.setFieldValue}
              formikValue={"scheduledDate"}
            />
            <Text style={styles.error}>{formik.errors.scheduledDate}</Text>
          </View>
        )}

        {/* Comentarios */}
        {params.activityId == activityIdArray.accident ||
        params.activityId == activityIdArray.roster ? (
          <></>
        ) : (
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
        )}

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
          {loading ? (
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
          )}
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
    quantity: "",
    guests: "",
    attendants: "",
    scheduledDate: "",
    comments: "",
  };
}

function validationSchema(activityId, activityIdArray) {
  return {
    quantity:
      activityId == activityIdArray.conditions
        ? Yup.string().optional()
        : Yup.string().required("La cantidad es obligatorio"),
    guests:
      activityId == activityIdArray.conditions ||
      activityId == activityIdArray.talk
        ? Yup.string().required("El total de convocados es obligatorio")
        : Yup.string().optional(),
    attendants:
      activityId == activityIdArray.conditions ||
      activityId == activityIdArray.talk ||
      activityId == activityIdArray.training ||
      activityId == activityIdArray.observations
        ? Yup.string().required("El total de asistentes es obligatorio")
        : Yup.string().optional(),
    scheduledDate:
      activityId == activityIdArray.accident ||
      activityId == activityIdArray.roster ||
      activityId == activityIdArray.professionogram ||
      activityId == activityIdArray.risk
        ? Yup.string().optional()
        : Yup.string().required("La fecha es obligatoria"),
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
