import React from "react";
import { FlatList } from "react-native";
import SecAnnPlanDetListItem from "./SecAnnPlanDetListItem";
import { Text } from "react-native-rapi-ui";

export default function SecAnnPlanDetList(props) {
  const { planId, planYear, monthlyReports } = props;
  // const months = [
  //   {
  //     id: "1",
  //     month: "Enero",
  //     color: COLORS.success,
  //     percentage: 100,
  //     textColor: 1,
  //   },
  //   {
  //     id: "2",
  //     month: "Febrero",
  //     color: COLORS.warning,
  //     percentage: 89,
  //     textColor: 1,
  //   },
  //   {
  //     id: "3",
  //     month: "Marzo",
  //     color: COLORS.warning,
  //     percentage: 50,
  //     textColor: 1,
  //   },
  //   {
  //     id: "4",
  //     month: "Abril",
  //     color: COLORS.warning,
  //     percentage: 15,
  //     textColor: 1,
  //   },
  //   {
  //     id: "5",
  //     month: "Mayo",
  //     color: COLORS.white,
  //     percentage: 1,
  //     textColor: 0,
  //   },
  //   {
  //     id: "6",
  //     month: "Junio",
  //     color: COLORS.white,
  //     percentage: 0,
  //     textColor: 0,
  //   },
  //   {
  //     id: "7",
  //     month: "Julio",
  //     color: COLORS.white,
  //     percentage: 0,
  //     textColor: 0,
  //   },
  //   {
  //     id: "8",
  //     month: "Agosto",
  //     color: COLORS.white,
  //     percentage: 0,
  //     textColor: 0,
  //   },
  //   {
  //     id: "9",
  //     month: "Septiembre",
  //     color: COLORS.white,
  //     percentage: 0,
  //     textColor: 0,
  //   },
  //   {
  //     id: "10",
  //     month: "Octubre",
  //     color: COLORS.white,
  //     percentage: 0,
  //     textColor: 0,
  //   },
  //   {
  //     id: "11",
  //     month: "Noviembre",
  //     color: COLORS.white,
  //     percentage: 0,
  //     textColor: 0,
  //   },
  //   {
  //     id: "12",
  //     month: "Diciembre",
  //     color: COLORS.white,
  //     percentage: 0,
  //     textColor: 0,
  //   },
  // ];
  return (
    <FlatList
      data={monthlyReports}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(report) => String(report.id)}
      renderItem={({ item }) => (
        <SecAnnPlanDetListItem
          planId={planId}
          monthItem={item}
          planYear={planYear}
        />
      )}
      ListEmptyComponent={() => <Text>No hay condiciones</Text>}
    />
  );
}

/* {map(months, (item, index) => (
        <SecAnnPlanDetListItem
          key={index}
          monthItem={item.month}
          color={item.color}
          percentage={item.percentage}
          textColor={item.textColor}
        /> 
      ))}*/
