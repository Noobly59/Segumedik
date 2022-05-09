import { StyleSheet, View } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  themeColor,
} from "react-native-rapi-ui";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ProcessActPendingListItem(props) {
  const { activity, reportId } = props;
  const navigation = useNavigation();

  const goToProcess = () => {
    switch (activity["activity"].category) {
      case 7:
        navigation.navigate("ProcessTalk", {
          planActivityId: activity["planActivityId"],
          reportId: reportId,
        });
        break;
      case 11:
        navigation.navigate("ProcessTalk", {
          planActivityId: activity["planActivityId"],
          reportId: reportId,
        });
        break;
    }
  };

  moment.updateLocale("es", {
    longDateFormat: {
      L: "DD/MM/YYYY",
    },
  });
  return (
    <TouchableWithoutFeedback
      style={styles.weeklyActivities}
      onPress={goToProcess}
    >
      <Section>
        <SectionContent
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons name={`logo-tux`} size={20} color={themeColor.black} />

          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.title}>
              {activity["activity"].name.charAt(0).toUpperCase() +
                activity["activity"].name.slice(1).toLowerCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.dates}>
              {activity["activityDate"]
                ? moment(activity["activityDate"]).format("L")
                : ""}
            </Text>
          </View>
        </SectionContent>
      </Section>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  weeklyActivities: {
    marginVertical: 5,
    paddingHorizontal: 10,
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
