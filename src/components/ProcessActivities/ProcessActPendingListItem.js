import { StyleSheet, View } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function ProcessActPendingListItem(props) {
  const { activity } = props;
  return (
    <TouchableWithoutFeedback
    // onPress={goToSecAnnPlan}
    >
      <Section style={styles.container}>
        <SectionContent
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={`${activity.icon}`}
            size={20}
            color={themeColor.black}
          />

          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.title}>
              {activity.actName}
            </Text>
          </View>
          <View>
            <Text style={styles.dates}>{activity.date}</Text>
          </View>
        </SectionContent>
      </Section>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  weeklyActivities: {
    paddingHorizontal: 12,
    marginTop: 5,
    flex: 1,
  },
  monthlyCounter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weeklyText: {
    marginBottom: 7,
    fontWeight: "bold",
  },
  monthlyNumber: {
    marginBottom: 7,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 14,
  },
});
