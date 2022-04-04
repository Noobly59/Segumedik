import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-rapi-ui";
import { map } from "lodash";
import SecAnnPlanDetListItem from "./SecAnnPlanDetListItem";

export default function SecAnnPlanDetList(props) {
  const { percentage } = props;
  const months = [
    { id: "1", month: "Enero" },
    { id: "2", month: "Febrero" },
    { id: "3", month: "Marzo" },
    { id: "4", month: "Abril" },
    { id: "5", month: "Mayo" },
    { id: "6", month: "Junio" },
    { id: "7", month: "Julio" },
    { id: "8", month: "Agosto" },
    { id: "9", month: "Septiembre" },
    { id: "10", month: "Octubre" },
    { id: "11", month: "Noviembre" },
    { id: "12", month: "Diciembre" },
  ];
  return (
    <ScrollView style={styles.listContainer}>
      {map(months, (item, index) => (
        <SecAnnPlanDetListItem
          key={index}
          monthItem={item.month}
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
