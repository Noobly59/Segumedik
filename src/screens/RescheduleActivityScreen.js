import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
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
import { reschedulePlanActivity } from "../api/securityAnnualPlans";

export default function RescheduleActivityScreen(props) {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    route: { params },
  } = props;
  console.log(params);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setLoading(true);
      const { comments, rescheduledDate } = formValue;
      setError("");
      const activity = {
        newDate: moment(rescheduledDate).format(),
        comments: comments,
      };
      try {
        const response = await reschedulePlanActivity(
          params.planActivityId,
          params.reportId,
          activity
        );
        setLoading(false);
        navigation.navigate("SecAnnPlanProcessActivities", {
          refresh: Math.random(),
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });

  const goToActivities = () => {
    navigation.goBack();
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
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Descripción:</Text>

          <TextInput
            value={formik.values.comments}
            autoCapitalize="none"
            placeholder="Comentarios:"
            onChangeText={(text) => formik.setFieldValue("comments", text)}
          />
          <Text style={styles.error}>{formik.errors.comments}</Text>
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Fecha:</Text>
          <Section style={styles.dateFormElement}>
            <SimplerDatePicker
              minDate={moment(
                params.planYear + "-" + "01-01",
                "YYYY-MM-DD"
              ).startOf("month")}
              maxDate={moment(
                params.planYear + "-" + "12-01",
                "YYYY-MM-DD"
              ).endOf("month")}
              onDatePicked={(date) =>
                formik.setFieldValue("rescheduledDate", date)
              }
            />
          </Section>
          <Text style={styles.error}>{formik.errors.rescheduledDate}</Text>
        </View>
        <View style={styles.formButtons}>
          <View>
            <Button
              text="Salir"
              type="TouchableOpacity"
              onPress={goToActivities}
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
            {loading ? (
              <ActivityIndicator
                size="large"
                style={styles.spinner}
                color={COLORS.primary}
              />
            ) : (
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
            )}
          </View>
        </View>
        <Text style={styles.error}>{error}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function initialValues() {
  return {
    comments: "",
    rescheduledDate: "",
  };
}

function validationSchema() {
  return {
    comments: Yup.string().required("La descripción es obligatoria"),
    rescheduledDate: Yup.string().required("El responsable obligatorio"),
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
  spinner: {
    marginVertical: 10,
  },
});
