import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  themeColor,
} from "react-native-rapi-ui";
import { COLORS } from "../../utils/constants";
import moment from "moment";

export default function SecAnnPlanDetHeader(props) {
  const { title, responsible, startDate } = props;
  moment.updateLocale("en", {
    longDateFormat: {
      L: "DD/MM/YYYY",
    },
  });
  return (
    <Section style={styles.headerContainer}>
      <SectionContent style={{ backgroundColor: COLORS.info }}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{`Responsable: ${responsible}`}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.text}>{`Inicio: ${moment(startDate).format(
            "L"
          )}`}</Text>
          <Text style={styles.text}>{`Fin: ${moment(startDate)
            .add(1, "y")
            .format("L")}`}</Text>
        </View>
      </SectionContent>
    </Section>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 7,
    marginVertical: 7,
  },
  textContainer: {
    justifyContent: "center",
  },
  text: {
    marginVertical: 4,
    color: COLORS.white,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
