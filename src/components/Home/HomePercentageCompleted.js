import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import useAuth from "../../hooks/useAuth";
import { getCompaniesAndHqName } from "../../api/companiesAndHqs";
import { COLORS } from "../../utils/constants";

export default function HomePercentageCompleted(props) {
  const { percentage } = props;
  const [companyName, setCompanyName] = useState("");
  const [hqName, setHqName] = useState("");
  const { auth } = useAuth();
  useEffect(() => {
    (async () => {
      const companyAndHqName = await getCompaniesAndHqName(
        auth[0].companyId,
        auth[0].headquarterId
      );
      setCompanyName(companyAndHqName.companyName);
      setHqName(companyAndHqName.hqName);
      console.log(companyName);
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
      width: `${num}%`,
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
        <Text style={{ fontSize: 19, fontWeight: "bold" }}>
          Porcentaje de Cumplimiento del Plan Anual
        </Text>
      </View>
      <View style={styles.percentageBarContainer}>
        <View style={styles.barContainer}>
          <View style={styles.fullBar}>
            <View style={[styles.tintedBar, barStyles(percentage)]} />
          </View>
        </View>
        <Text style={styles.percentage}>{`${percentage}%`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  percentageContainer: {
    marginVertical: 15,
    marginBottom: 7,
  },
  title: {
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  percentageBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});
