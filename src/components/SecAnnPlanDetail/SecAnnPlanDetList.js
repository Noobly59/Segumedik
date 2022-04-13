import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import { map } from "lodash";
import SecAnnPlanDetListItem from "./SecAnnPlanDetListItem";

export default function SecAnnPlanDetList(props) {
  const { percentage } = props;
  const months = [
    { id: "1", month: "Enero", color: themeColor.warning },
    { id: "2", month: "Febrero", color: themeColor.warning },
    { id: "3", month: "Marzo", color: themeColor.warning },
    { id: "4", month: "Abril", color: themeColor.white },
    { id: "5", month: "Mayo", color: themeColor.white },
    { id: "6", month: "Junio", color: themeColor.white },
    { id: "7", month: "Julio", color: themeColor.white },
    { id: "8", month: "Agosto", color: themeColor.white },
    { id: "9", month: "Septiembre", color: themeColor.white },
    { id: "10", month: "Octubre", color: themeColor.white },
    { id: "11", month: "Noviembre", color: themeColor.white },
    { id: "12", month: "Diciembre", color: themeColor.white },
  ];
  return (
    <ScrollView style={styles.listContainer}>
      {map(months, (item, index) => (
        <SecAnnPlanDetListItem
          key={index}
          monthItem={item.month}
          color={item.color}
          percentage={percentage}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 7,
  },
});
