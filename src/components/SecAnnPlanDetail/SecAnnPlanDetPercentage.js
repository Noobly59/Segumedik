import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import { COLORS } from "../../utils/constants";

export default function SecAnnPlanDetPercentage(props) {
  const { percentage } = props;
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
  return (
    <View>
      <View style={styles.title}>
        <Text>Porcentaje de Cumplimiento</Text>
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
  title: {
    paddingHorizontal: 12,
    marginVertical: 7,
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
    paddingRight: 7,
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
});
