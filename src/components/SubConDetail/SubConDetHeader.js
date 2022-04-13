import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  Button,
  themeColor,
} from "react-native-rapi-ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function SubConDetHeader(props) {
  const { responsibleAndDesc } = props;
  return (
    <Section style={styles.headerContainer}>
      <SectionContent style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            style={styles.text}
          >{`Responsable: ${responsibleAndDesc.responsible}`}</Text>
          <Text
            numberOfLines={2}
            style={styles.text}
          >{`Descripción: ${responsibleAndDesc.description}`}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="pencil" size={30} color={themeColor.white} />
          </TouchableOpacity>
        </View>
      </SectionContent>
    </Section>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 7,
    marginVertical: 12,
  },
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  textContainer: {
    justifyContent: "center",
    flex: 4,
  },
  text: {
    fontSize: 17,
    marginVertical: 7,
  },
  buttonContainer: {
    justifyContent: "center",
    flex: 1,
  },
  addButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: themeColor.primary600,
    alignItems: "center",
    justifyContent: "center",
  },
});
