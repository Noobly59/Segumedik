import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import {
  Text,
  Section,
  SectionContent,
  themeColor,
} from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import { COLORS } from "../../utils/constants";
import { getPlanCompliance } from "../../api/securityAnnualPlans";

export default function SecAnnActualPlan(props) {
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
        // console.log(secAnnPlanDetail["annualPlan"]?.id);
        // console.log(response[0]);
        setCompliance(response[0] ? response[0] : 0);
        // console.log(compliance);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const barStyles = (num) => {
    const color =
      num > 99
        ? COLORS.primary
        : num > 74
        ? COLORS.success
        : num > 32
        ? COLORS.warning
        : COLORS.danger;
    return {
      backgroundColor: color,
      width: `${num}%`,
    };
  };

  const percentageTextColor = (num) => {
    var color = "";
    num > 74
      ? (color = "success")
      : num > 32
      ? (color = "warning")
      : (color = "danger");
    return color;
  };

  moment.updateLocale("en", {
    longDateFormat: {
      L: "DD/MM/YYYY",
    },
  });

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <Section style={styles.headerContainer}>
        <SectionContent>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {secAnnPlanDetail["annualPlan"]?.name != ""
                ? secAnnPlanDetail["annualPlan"]?.name
                : `Cronograma de actividades ${secAnnPlanDetail["annualPlan"]?.year}`}
            </Text>
            <Text
              style={styles.text}
            >{`Responsable: ${secAnnPlanDetail["collaborator"]?.firstName} ${secAnnPlanDetail["collaborator"]?.lastName}`}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.text}>{`Inicio: ${moment(
              secAnnPlanDetail["annualPlan"]?.startDate
            ).format("L")}`}</Text>
            <Text style={styles.text}>{`Fin: ${moment([
              secAnnPlanDetail["annualPlan"]?.startDate,
            ])
              .add(1, "y")
              .format("L")}`}</Text>
          </View>
          {loading ? (
            <ActivityIndicator
              size="large"
              style={styles.spinner}
              color={COLORS.primary}
            />
          ) : (
            <View style={styles.percentageBarContainer}>
              <View style={styles.barContainer}>
                <View style={styles.fullBar}>
                  <View style={[styles.tintedBar, barStyles(compliance)]} />
                </View>
              </View>
              <Text
                style={styles.percentage}
                status={percentageTextColor(compliance)}
              >{`${Math.trunc(compliance)}%`}</Text>
            </View>
          )}
        </SectionContent>
      </Section>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 7,
    marginVertical: 12,
  },
  textContainer: {
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    marginVertical: 4,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  percentageBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barContainer: {
    marginVertical: 9,
    flexDirection: "row",
  },
  percentage: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
  fullBar: {
    backgroundColor: "#dedede",
    width: "88%",
    height: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  tintedBar: {
    // backgroundColor: "#e5e70b",
    // width: "58%",
    height: 12,
    borderRadius: 20,
  },
  spinner: {
    marginVertical: 10,
  },
});
