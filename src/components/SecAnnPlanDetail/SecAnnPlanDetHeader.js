import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  themeColor,
} from "react-native-rapi-ui";

export default function SecAnnPlanDetHeader() {
  return (
    <Section style={styles.headerContainer}>
      <SectionContent style={{ backgroundColor: themeColor.info }}>
        <View style={styles.textContainer}>
          <Text
            style={styles.text}
          >{`Cronograma de Actividades del Año 2022`}</Text>
          <Text
            style={styles.text}
          >{`Responsable: Diego Emilio Suárez Villagómez`}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.text}>{`Inicio: 01-01-2022`}</Text>
          <Text style={styles.text}>{`Fin: 01-01-2023`}</Text>
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
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
