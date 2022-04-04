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

export default function SecAnnPlanDetListItem(props) {
  const { monthItem, percentage } = props;
  const navigation = useNavigation();
  const goToProcessActivities = () => {
    navigation.navigate("SecAnnPlanProcessActivities");
  };
  const barStyles = (num) => {
    const color = num > 74 ? "#00ac17" : num > 32 ? "#e5e70b" : "#ff3e3e";
    return {
      backgroundColor: color,
      width: `${num}%`,
    };
  };
  return (
    <TouchableWithoutFeedback
      style={styles.itemContainer}
      onPress={goToProcessActivities}
    >
      <Section style={{ flex: 1 }}>
        <SectionContent style={styles.container}>
          <View>
            <Text>{monthItem}</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <View style={styles.barContainer}>
              <View style={styles.fullBar}>
                <View style={[styles.tintedBar, barStyles(percentage)]} />
              </View>
            </View>
            <Text>5/7</Text>

            <Ionicons
              name="chevron-forward"
              size={25}
              color={themeColor.primary600}
            />
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
    height: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  tintedBar: {
    // backgroundColor: "#e5e70b",
    // width: "58%",
    height: 5,
    borderRadius: 20,
  },
});
