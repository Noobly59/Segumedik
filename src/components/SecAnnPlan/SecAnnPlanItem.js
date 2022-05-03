import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Section } from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { COLORS } from "../../utils/constants";
import { getPlanCompliance } from "../../api/securityAnnualPlans";

export default function SecAnnPlanItem(props) {
  const { secAnnPlanDetail } = props;
  const [compliance, setCompliance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("SecAnnPlanDetail", secAnnPlanDetail);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getPlanCompliance(
          secAnnPlanDetail["annualPlan"]?.id
        );
        setCompliance(response[0] ? response[0] : 0);
        console.log(compliance);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  // console.log(secAnnPlanDetail);
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <Section style={styles.itemContainer}>
        <View style={styles.container}>
          {/* <View style={styles.headquarters}>
            <Text style={styles.title}>GYE</Text>
          </View> */}
          <View style={styles.conditionInfo}>
            <View style={styles.infoText}>
              <View>
                {/* <Text style={styles.secAnnPlanDetail}>
                  Empresa para pruebas
                </Text> */}
                <Text style={styles.secAnnPlanDetail} numberOfLines={1}>
                  {`${secAnnPlanDetail["annualPlan"].name}`}
                </Text>
              </View>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  style={styles.spinner}
                  color={COLORS.primary}
                />
              ) : (
                <View>
                  <Text style={styles.secAnnPlanDetail} status="warning">
                    {`${Math.trunc(compliance)}%`}
                  </Text>
                </View>
              )}
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
