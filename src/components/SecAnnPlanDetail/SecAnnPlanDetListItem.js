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
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/constants";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import { createReport } from "../../api/securityAnnualPlans";

export default function SecAnnPlanDetListItem(props) {
  const { planId, monthItem, planYear } = props;
  const navigation = useNavigation();
  const { auth } = useAuth();

  const [itemLoading, setItemLoading] = useState(false);

  const goToProcessActivities = () => {
    // console.log(monthItem.reportDate);
    // console.log(moment(monthItem.reportDate).format("MMMM"));
    navigation.navigate("ProcessActivityNavigation", {
      planId: planId,
      month: monthItem.scheduledDate,
      reportId: monthItem.reportId,
      planYear: planYear,
    });
  };

  const createReportButton = async () => {
    setItemLoading(true);
    try {
      const report = {
        reportId: null,
        headquarterId: auth[0].headquarterId,
        reportDate: moment(
          planYear + "-" + monthItem.scheduledDate + "-01",
          "YYYY-MM-DD"
        )
          .endOf("month")
          .format("YYYY-MM-DD"),
        createdBy: auth[0].userName,
        annualPlanId: planId,
        status: 0,
      };
      const response = await createReport(report);
      monthItem.reportId = response.reportId;
      monthItem.reportDate = response.reportDate;
      setItemLoading(false);
      navigation.navigate("ProcessActivityNavigation", {
        planId: planId,
        month: monthItem.scheduledDate,
        reportId: response.reportId,
        planYear: planYear,
      });
    } catch (error) {
      setItemLoading(false);
      console.log(error);
    }
  };

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

  const countAndMonthColor = (num) => {
    var color = "";
    switch (num) {
      case 0:
        color = "black";
        break;
      case 1:
        color = "white";
        break;
    }
    return color;
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
    <>
      {monthItem.reportId == "00000000-0000-0000-0000-000000000000" ? (
        itemLoading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={styles.spinner}
          />
        ) : (
          <TouchableWithoutFeedback
            style={styles.itemContainer}
            onPress={createReportButton}
          >
            <Section style={{ flex: 1 }}>
              <SectionContent style={styles.container}>
                <View>
                  <Text>
                    {moment(monthItem.scheduledDate, "MM").format("MMMM")}
                  </Text>
                </View>

                <View style={styles.infoTextContainer}>
                  <View style={styles.barContainer}>
                    <View style={styles.fullBar}>
                      <View
                        style={[
                          styles.tintedBar,
                          barStyles(monthItem.compliancePercentage),
                        ]}
                      />
                    </View>
                  </View>
                  <Text>
                    {`${monthItem["processedActivities"]}/${monthItem["pendingActivities"]}`}
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={25}
                    color={COLORS.primary}
                  />
                </View>
              </SectionContent>
            </Section>
          </TouchableWithoutFeedback>
        )
      ) : (
        <TouchableWithoutFeedback
          style={styles.itemContainer}
          onPress={goToProcessActivities}
        >
          <Section style={{ flex: 1 }}>
            <SectionContent
              style={[
                styles.container,
                {
                  backgroundColor:
                    moment(monthItem.reportDate).isBefore() &&
                    monthItem.reportStatus === 0
                      ? COLORS.warning
                      : moment(monthItem.reportDate).isBefore() &&
                        monthItem.reportStatus !== 0
                      ? COLORS.success
                      : COLORS.white,
                },
              ]}
            >
              <View>
                <Text
                  status={countAndMonthColor(
                    moment(monthItem.reportDate).isBefore() &&
                      monthItem.reportStatus === 0
                      ? 1
                      : moment(monthItem.reportDate).isBefore() &&
                        monthItem.reportStatus !== 0
                      ? 1
                      : 0
                  )}
                >
                  {moment(monthItem.scheduledDate, "MM").format("MMMM")}
                </Text>
              </View>

              <View style={styles.infoTextContainer}>
                <View style={styles.barContainer}>
                  <View style={styles.fullBar}>
                    <View
                      style={[
                        styles.tintedBar,
                        barStyles(monthItem.compliancePercentage),
                      ]}
                    />
                  </View>
                </View>
                <Text
                  status={countAndMonthColor(
                    moment(monthItem.reportDate).isBefore() &&
                      monthItem.reportStatus === 0
                      ? 1
                      : moment(monthItem.reportDate).isBefore() &&
                        monthItem.reportStatus !== 0
                      ? 1
                      : 0
                  )}
                >
                  {`${monthItem["processedActivities"]}/${monthItem["pendingActivities"]}`}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={25}
                  color={COLORS.primary}
                />
              </View>
            </SectionContent>
          </Section>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 3,
    marginHorizontal: 7,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  spinner: {
    marginVertical: 17,
  },
  infoTextContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginStart: "auto",
  },
  barContainer: {
    flexDirection: "row",
    right: -40,
  },
  fullBar: {
    backgroundColor: "#dedede",
    width: "50%",
    height: 6,
    borderRadius: 20,
    overflow: "hidden",
  },
  tintedBar: {
    // backgroundColor: "#e5e70b",
    // width: "58%",
    borderWidth: 0.7,
    height: 6,
    borderRadius: 20,
  },
});
