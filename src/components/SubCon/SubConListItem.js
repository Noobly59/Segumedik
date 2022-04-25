import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Section, Text, themeColor } from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

export default function SubConListItem(props) {
  const { subConDetails } = props;
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("SubConDetail", subConDetails);
  };

  const termColor = (num) => {
    var color = "";
    switch (num) {
      case 1:
        color = "danger";
        break;
      case 2:
        color = "warning";
        break;
      case 3:
        color = "warning";
        break;
      case 4:
        color = "success";
        break;
    }
    return color;
  };
  const termText = (num) => {
    var term = "";
    switch (num) {
      case 1:
        term = "Inmediatamente";
        break;
      case 2:
        term = "Corto Plazo";
        break;
      case 3:
        term = "Mediano Plazo";
        break;
      case 4:
        term = "Largo Plazo";
        break;
    }
    return term;
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
  const statusText = (num) => {
    var term = "";
    switch (num) {
      case 1:
        term = "Pendiente";
        break;
      case 2:
        term = "Ejecutada";
        break;
    }
    return term;
  };

  moment.updateLocale("es", {
    longDateFormat: {
      L: "DD/MM/YYYY",
    },
  });

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={goToDetail}
      activeOpacity={0.5}
    >
      <Section>
        <View style={styles.container}>
          {/* <View style={styles.headquarters}>
            <Text style={styles.title}>GYE</Text>
          </View> */}
          <View style={styles.conditionInfo}>
            <View style={styles.infoText}>
              <View>
                <Text style={styles.subConDetail}>
                  {moment(subConDetails.detectionDate).format("L")}
                </Text>
              </View>
              <View>
                <Text
                  style={styles.subConDetail}
                  status={termColor(subConDetails.deadline)}
                >
                  {termText(subConDetails.deadline)}
                </Text>
              </View>
            </View>
            <Text style={styles.subConDetail} numberOfLines={1}>
              {`${subConDetails.description}`}
            </Text>
            <Text style={styles.subConDetail}>{subConDetails.responsible}</Text>
            <Text
              style={styles.subConDetail}
              status={statusColor(subConDetails.conditionStatus)}
            >
              {statusText(subConDetails.conditionStatus)}
            </Text>
          </View>
        </View>
      </Section>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    paddingVertical: 7,
  },
  // headquarters: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // title: {
  //   fontSize: 15,
  //   alignSelf: "center",
  // },
  conditionInfo: {
    flex: 5,
    paddingHorizontal: 10,
  },
  infoText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subConDetail: {
    fontSize: 17,
    marginBottom: 5,
  },
});
