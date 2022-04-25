import { View, StyleSheet } from "react-native";
import {
  Text,
  Section,
  SectionContent,
  themeColor,
} from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import { COLORS } from "../../utils/constants";

export default function SecAnnActualPlan(props) {
  const { secAnnPlanDetail, percentage, status } = props;
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("SecAnnPlanDetail", secAnnPlanDetail);
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
  moment.updateLocale("es", {
    longDateFormat: {
      L: "DD/MM/YYYY",
    },
  });

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <Section style={styles.headerContainer}>
        <SectionContent>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {secAnnPlanDetail["annualPlan"]?.name}
            </Text>
            <Text
              style={styles.text}
            >{`Responsable: ${secAnnPlanDetail["collaborator"]?.firstName} ${secAnnPlanDetail["collaborator"]?.lastName}`}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.text}>{`Inicio: ${moment(
              secAnnPlanDetail["annualPlan"]?.startDate
            ).format("L")}`}</Text>
            <Text style={styles.text}>{`Fin: ${moment([
              secAnnPlanDetail["annualPlan"]?.startDate,
            ])
              .add(1, "y")
              .format("L")}`}</Text>
          </View>
          <View style={styles.percentageBarContainer}>
            <View style={styles.barContainer}>
              <View style={styles.fullBar}>
                <View style={[styles.tintedBar, barStyles(percentage)]} />
              </View>
            </View>
            <Text
              style={styles.percentage}
              status={status}
            >{`${percentage}%`}</Text>
          </View>
        </SectionContent>
      </Section>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 7,
    marginVertical: 12,
  },
  textContainer: {
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    marginVertical: 4,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  percentageBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barContainer: {
    marginVertical: 9,
    flexDirection: "row",
  },
  percentage: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
  fullBar: {
    backgroundColor: "#dedede",
    width: "88%",
    height: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  tintedBar: {
    // backgroundColor: "#e5e70b",
    // width: "58%",
    height: 12,
    borderRadius: 20,
  },
});
