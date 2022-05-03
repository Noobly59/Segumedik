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
import moment from "moment";

export default function SecAnnPlanDetListItem(props) {
  const { planId, monthItem } = props;
  const navigation = useNavigation();
  const goToProcessActivities = () => {
    navigation.navigate("SecAnnPlanProcessActivities", {
      planId: planId,
      month: moment(monthItem["report"].reportDate).format("M"),
      reportId: monthItem["report"].reportId,
    });
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
  moment.updateLocale("es", {
    months:
      "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
        "_"
      ),
    monthsShort:
      "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_"),
  });
  return (
    <TouchableWithoutFeedback
      style={styles.itemContainer}
      onPress={goToProcessActivities}
    >
      <Section style={{ flex: 1 }}>
        <SectionContent
          style={[
            styles.container,
            {
              backgroundColor:
                moment(monthItem["report"].reportDate).isBefore() &&
                monthItem["report"].status === 0
                  ? COLORS.warning
                  : moment(monthItem["report"].reportDate).isBefore() &&
                    monthItem["report"].status !== 0
                  ? COLORS.success
                  : COLORS.white,
            },
          ]}
        >
          <View>
            <Text
              status={countAndMonthColor(
                moment(monthItem["report"].reportDate).isBefore() &&
                  monthItem["report"].status === 0
                  ? 1
                  : moment(monthItem["report"].reportDate).isBefore() &&
                    monthItem["report"].status !== 0
                  ? 1
                  : 0
              )}
            >
              {moment(monthItem["report"].reportDate).format("MMMM")}
            </Text>
          </View>

          <View style={styles.infoTextContainer}>
            <View style={styles.barContainer}>
              <View style={styles.fullBar}>
                <View
                  style={[
                    styles.tintedBar,
                    barStyles(
                      monthItem["pendingActivities"] > 0
                        ? (monthItem["processedActivities"] /
                            monthItem["pendingActivities"]) *
                            100
                        : 0
                    ),
                  ]}
                />
              </View>
            </View>
            <Text
              status={countAndMonthColor(
                moment(monthItem["report"].reportDate).isBefore() &&
                  monthItem["report"].status === 0
                  ? 1
                  : moment(monthItem["report"].reportDate).isBefore() &&
                    monthItem["report"].status !== 0
                  ? 1
                  : 0
              )}
            >
              {`${monthItem["processedActivities"]}/${monthItem["pendingActivities"]}`}
            </Text>

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
    marginHorizontal: 7,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTextContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginStart: "auto",
  },
  barContainer: {
    flexDirection: "row",
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
