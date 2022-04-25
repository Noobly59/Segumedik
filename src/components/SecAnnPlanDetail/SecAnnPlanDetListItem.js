import { View, StyleSheet } from "react-native";
import {
  Text,
  Section,
  SectionContent,
  themeColor,
} from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/constants";

export default function SecAnnPlanDetListItem(props) {
  const { monthItem, percentage, color, textColor } = props;
  const navigation = useNavigation();
  const goToProcessActivities = () => {
    navigation.navigate("SecAnnPlanProcessActivities");
  };
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
  const countAndMonthColor = (num) => {
    var color = "";
    switch (num) {
      case 0:
        color = "black";
        break;
      case 1:
        color = "white";
        break;
    }
    return color;
  };
  return (
    <TouchableWithoutFeedback
      style={styles.itemContainer}
      onPress={goToProcessActivities}
    >
      <Section style={{ flex: 1 }}>
        <SectionContent style={[styles.container, { backgroundColor: color }]}>
          <View>
            <Text status={countAndMonthColor(textColor)}>{monthItem}</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <View style={styles.barContainer}>
              <View style={styles.fullBar}>
                <View style={[styles.tintedBar, barStyles(percentage)]} />
              </View>
            </View>
            <Text status={countAndMonthColor(textColor)}>5/7</Text>

            <Ionicons name="chevron-forward" size={25} color={COLORS.primary} />
          </View>
        </SectionContent>
      </Section>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 3,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTextContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    right: -40,
  },
  fullBar: {
    backgroundColor: "#dedede",
    width: "50%",
    height: 6,
    borderRadius: 20,
    overflow: "hidden",
  },
  tintedBar: {
    // backgroundColor: "#e5e70b",
    // width: "58%",
    borderWidth: 0.7,
    height: 6,
    borderRadius: 20,
  },
});
