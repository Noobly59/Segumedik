import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Section, SectionContent, Text } from "react-native-rapi-ui";
import { COLORS } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

export default function AccidentActivity(props) {
  const { accidentsLength, lostDays, accidents } = props;
  const navigation = useNavigation();
  const goToAccidents = () => {
    navigation.navigate("Accidents", {
      total: accidentsLength,
      lostDays: lostDays,
      accidents: accidents,
      // refresh: refresh,
    });
  };
  return (
    <TouchableOpacity onPress={goToAccidents} activeOpacity={0.5}>
      <Section style={styles.headerContainer}>
        <SectionContent style={{ backgroundColor: COLORS.warning }}>
          <View>
            <Text style={styles.title}>Accidentes</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {`Este mes se han registrado ${accidentsLength} accidentes, que suman ${lostDays} días perdidos. Para agregarlos al reporte de actividades mensuales, de clic en este cuadro.`}
            </Text>
          </View>
        </SectionContent>
      </Section>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 7,
    marginVertical: 7,
  },
  title: {
    fontSize: 20,
    color: COLORS.white,
  },
  textContainer: {
    justifyContent: "center",
  },
  text: {
    marginVertical: 4,
    color: COLORS.white,
  },
});
