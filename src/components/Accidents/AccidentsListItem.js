import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  themeColor,
} from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../utils/constants";
import moment from "moment";

export default function AccidentsListItem(props) {
  const { accident } = props;
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate("SubConDetail", subConDetails);
  };

  const statusColor = (num) => {
    var color = "";
    switch (num) {
      case 1:
        color = "danger";
        break;
      case 2:
        color = "success";
        break;
    }
    return color;
  };

  moment.updateLocale("en", {
    longDateFormat: {
      L: "DD/MM/YYYY",
    },
  });

  return (
    <Section style={styles.headerContainer}>
      <SectionContent>
        <View style={styles.dateContainer}>
          <Text style={styles.text}>
            {moment(accident.accidentDate).format("L")}
          </Text>
          <Text style={styles.text}>
            {accident.reported ? "Reportado" : "No Reportado"}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{accident.employeeName}</Text>
        </View>
      </SectionContent>
    </Section>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 7,
    marginVertical: 7,
  },
  textContainer: {
    justifyContent: "center",
  },
  text: {
    marginVertical: 4,
    color: COLORS.black,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
