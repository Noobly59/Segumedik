import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Section } from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { COLORS } from "../../utils/constants";
import { getPlanCompliance } from "../../api/securityAnnualPlans";

export default function SecAnnPlanItem(props) {
  const { secAnnPlanDetail } = props;
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("SecAnnPlanDetail", secAnnPlanDetail);
  };

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <Section style={styles.itemContainer}>
        <View style={styles.container}>
          <View style={styles.conditionInfo}>
            <View style={styles.infoText}>
              <View>
                <Text style={styles.secAnnPlanDetail} numberOfLines={1}>
                  {secAnnPlanDetail["annualPlan"]?.name != ""
                    ? secAnnPlanDetail["annualPlan"]?.name
                    : `Cronograma de actividades ${secAnnPlanDetail["annualPlan"]?.year}`}
                </Text>
              </View>
            </View>
            <Text style={styles.secAnnPlanDetail}>
              {`${secAnnPlanDetail["collaborator"]?.firstName} ${secAnnPlanDetail["collaborator"]?.lastName}`}
            </Text>
          </View>
        </View>
      </Section>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 10,
    marginVertical: 12,
  },
  container: {
    flexDirection: "row",
    paddingVertical: 7,
  },
  headquarters: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    alignSelf: "center",
  },
  conditionInfo: {
    flex: 5,
    paddingHorizontal: 10,
  },
  infoText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secAnnPlanDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  spinner: {
    marginVertical: 10,
  },
});
