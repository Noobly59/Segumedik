import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import useAuth from "../../hooks/useAuth";
import { getCompaniesAndHqName } from "../../api/companiesAndHqs";
import { COLORS } from "../../utils/constants";
import { getCompliancePercentage } from "../../api/securityAnnualPlans";

export default function HomePercentageCompleted() {
  const [companyName, setCompanyName] = useState("");
  const [compliance, setCompliance] = useState("");
  const [hqName, setHqName] = useState("");
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const companyAndHqName = await getCompaniesAndHqName(
        auth[0].companyId,
        auth[0].headquarterId
      );
      setCompanyName(companyAndHqName.companyName);
      setHqName(companyAndHqName.hqName);
      const compliancePercentage = await getCompliancePercentage(
        auth[0].headquarterId
        // "b1af8100-a7ad-4fd4-8ca5-36ae31721c51"
      );
      setCompliance(
        typeof compliancePercentage[0] !== "undefined"
          ? compliancePercentage[0]
          : 0
      );
      setLoading(false);
    })();
  }, []);

  const barStyles = (num) => {
    // const color = num > 74 ? "#00ac17" : num > 32 ? "#e5e70b" : "#ff3e3e";
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
      width: `${num ? num : 0}%`,
    };
  };

  return (
    <View style={styles.percentageContainer}>
      <View style={[styles.title, { alignItems: "center" }]}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {`${companyName}(${hqName})`}
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Porcentaje de Cumplimiento del Plan Anual
        </Text>
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
          <Text style={styles.percentage}>{`${Math.trunc(compliance)}%`}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  percentageContainer: {
    marginVertical: 12,
    marginBottom: 7,
  },
  title: {
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  percentageBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 30,
  },
  barContainer: {
    paddingHorizontal: 12,
    marginVertical: 9,
    flexDirection: "row",
  },
  percentage: {
    fontSize: 20,
    alignSelf: "center",
    paddingRight: 12,
  },
  fullBar: {
    backgroundColor: "#dedede",
    width: "93%",
    height: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  tintedBar: {
    // backgroundColor: "#e5e70b",
    // width: "58%",
    height: 20,
    borderRadius: 20,
  },
  spinner: {
    marginVertical: 10,
  },
});
