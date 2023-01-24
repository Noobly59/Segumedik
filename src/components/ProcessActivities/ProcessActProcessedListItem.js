import { StyleSheet, View } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  themeColor,
} from "react-native-rapi-ui";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import { COLORS } from "../../utils/constants";

export default function ProcessActProcessedListItem(props) {
  const { activity } = props;
  // console.log(activity);
  moment.updateLocale("en", {
    longDateFormat: {
      L: "DD/MM/YYYY",
    },
  });
  const barStyles = (num) => {
    let color = "";
    switch (num) {
      case 1:
        color = COLORS.success;
        break;
      case 2:
        color = COLORS.success;
        break;
      case 3:
        color = COLORS.warning;
        break;
      case 4:
        color = COLORS.danger;
        break;
      default:
        color = COLORS.neutral;
    }
    return {
      borderLeftColor: color,
    };
  };
  return (
    <TouchableWithoutFeedback style={styles.weeklyActivities}>
      <Section
        style={[
          {
            borderLeftWidth: 3,
          },
          barStyles(activity["processedActivity"].status),
        ]}
      >
        <SectionContent
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.title}>
              {activity["name"].charAt(0).toUpperCase() +
                activity["name"].slice(1).toLowerCase()}
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
