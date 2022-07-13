import React, { useState } from "react";
import AccidentsList from "../components/Accidents/AccidentsList";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/constants";
import { Text, Button } from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import { addAccidents } from "../api/securityAnnualPlans";
import moment from "moment";

export default function Accidents(props) {
  const {
    route: { params },
  } = props;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const processAccidents = async () => {
    setLoading(true);
    try {
      const processAccidentActivity = {
        planId: params.planId,
        reportId: params.reportId,
        total: params.total,
        lostDays: params.lostDays,
        date: moment(params.planYear + "-" + params.month + "-01", "YYYY-MM-DD")
          .startOf("month")
          .format("YYYY-MM-DD"),
      };
      const response = await addAccidents(processAccidentActivity);
      setLoading(false);
      navigation.navigate("SecAnnPlanProcessActivities", {
        refresh: Math.random(),
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ paddingBottom: 70, flex: 1 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Accidentes Registados</Text>
      </View>
      <AccidentsList style={{ flex: 1 }} accidents={params.accidents} />

      <View style={styles.formButtons}>
        <View>
          <Button
            text="Salir"
            type="TouchableOpacity"
            onPress={navigation.goBack}
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
            color={COLORS.primary}
            style={styles.spinner}
          />
        ) : (
          <View>
            <Button
              text="Guardar"
              type="TouchableOpacity"
              onPress={processAccidents}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    margin: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  formButtons: {
    marginTop: "auto",
    margin: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spinner: {
    marginVertical: 10,
  },
});
