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
import { COLORS } from "../../utils/constants";

export default function ProcessActPendingListItem(props) {
  const { activity, reportId } = props;
  const navigation = useNavigation();

  // console.log(activity);

  const goToProcess = () => {
    switch (activity.category) {
      case 9:
        break;
      case 11:
        navigation.navigate("ProcessTalk", {
          planActivityId: activity.id,
          reportId: reportId.reportId,
          planId: reportId.planId,
          month: reportId.month,
        });
        break;
      default:
        navigation.navigate("ProcessActivities", {
          planActivityId: activity.id,
          reportId: reportId.reportId,
          planId: reportId.planId,
          month: reportId.month,
          category: activity.category,
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
          <Ionicons
            name={`${activity.relatedIcon}`}
            size={20}
            color={COLORS.primary}
          />

          <View style={{ flex: 1, marginLeft: 6 }}>
            <Text numberOfLines={1} style={styles.title}>
              {activity.name.charAt(0).toUpperCase() +
                activity.name.slice(1).toLowerCase()}
            </Text>
          </View>
          {/* <View>
            <Text numberOfLines={1} style={styles.title} status="danger">
              {activity.category}
            </Text>
          </View> */}
          <View>
            <Text style={styles.dates}>
              {activity.scheduledDate ? activity.scheduledDate : ""}
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
