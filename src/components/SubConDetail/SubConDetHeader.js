import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  Button,
  themeColor,
} from "react-native-rapi-ui";

export default function SubConDetHeader() {
  return (
    <Section style={styles.headerContainer}>
      <SectionContent style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            style={styles.text}
          >{`Responsable: Gerencia`}</Text>
          <Text
            numberOfLines={2}
            style={styles.text}
          >{`Descripción: Extintor sin señalética cerca a la Sala de Sesiones 2`}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Editar" color={themeColor.primary600} />
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
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 7,
    justifyContent: "space-between",
  },
  textContainer: {
    justifyContent: "center",
    flex: 1,
  },
  text: {
    marginVertical: 4,
  },
  buttonContainer: {
    justifyContent: "center",
  },
});
