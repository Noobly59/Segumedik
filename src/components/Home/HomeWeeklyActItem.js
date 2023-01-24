import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  themeColor,
} from "react-native-rapi-ui";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { COLORS } from "../../utils/constants";

export default function HomeWeeklyActItem(props) {
  const { menuItemName } = props;
  const navigation = useNavigation();
  const goToSecAnnPlan = () => {
    navigation.navigate("SecAnnPlanNavigation");
  };
  moment.updateLocale("en", {
    longDateFormat: {
      L: "DD/MM/YYYY",
    },
  });
  return (
    <TouchableOpacity onPress={goToSecAnnPlan} activeOpacity={0.5}>
      <Section style={styles.container}>
        <SectionContent
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={`${menuItemName.relatedIcon}`}
            size={30}
            color={COLORS.primary}
          />

          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.title}>
              {menuItemName.name}
            </Text>
          </View>
          <View>
            <Text style={styles.date}>
              {menuItemName.activityDate
                ? moment(menuItemName.activityDate).format("L")
                : ""}
            </Text>
          </View>
        </SectionContent>
      </Section>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
  },
  title: {
    fontSize: 16,
    textAlign: "left",
  },
  date: {
    fontSize: 15,
    textAlign: "center",
  },
});
