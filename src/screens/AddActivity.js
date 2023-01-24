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
import useAuth from "../hooks/useAuth";
import { COLORS } from "../utils/constants";
import { addUnplannedPlanActivity } from "../api/securityAnnualPlans";
import DatePicker from "../components/DatePicker/DatePicker";

export default function AddActivity(props) {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    route: { params },
  } = props;
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setLoading(true);
      const { observations, scheduledDate } = formValue;
      setError("");
      const activity = [
        {
          activityId: params.activity.activityId,
          date: moment(scheduledDate).format(),
          observations: observations,
          planId: params.planId,
        },
      ];
      try {
        setLoading(false);
        const response = await addUnplannedPlanActivity(activity[0]);
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
            value={formik.values.observations}
            autoCapitalize="none"
            placeholder="Descripción"
            onChangeText={(text) => formik.setFieldValue("observations", text)}
          />
          <Text style={styles.error}>{formik.errors.observations}</Text>
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Fecha de detección:</Text>
          {/* <Section style={styles.dateFormElement}>
            <SimplerDatePicker
              minDate={moment(
                params.planYear + "-" + params.month + "-01",
                "YYYY-MM-DD"
              ).startOf("month")}
              maxDate={moment(
                params.planYear + "-" + params.month + "-01",
                "YYYY-MM-DD"
              ).endOf("month")}
              onDatePicked={(date) =>
                formik.setFieldValue("scheduledDate", date)
              }
            />
          </Section> */}
          <DatePicker
            setDate={formik.setFieldValue}
            formikValue={"scheduledDate"}
            minDate={moment(
              params.planYear + "-" + params.month + "-01",
              "YYYY-MM-DD"
            )}
            maxDate={moment(
              params.planYear + "-" + (params.month + 1) + "-01",
              "YYYY-MM-DD"
            ).endOf("month")}
          />
          <Text style={styles.error}>{formik.errors.scheduledDate}</Text>
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
            {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}

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
    observations: "",
    scheduledDate: "",
  };
}

function validationSchema() {
  return {
    observations: Yup.string().required("La descripción es obligatoria"),
    scheduledDate: Yup.string().required("El responsable obligatorio"),
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
