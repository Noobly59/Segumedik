import { View, StyleSheet } from "react-native";
import { Text, Section } from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function SecAnnPlanItem(props) {
  const { secAnnPlanDetail } = props;
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("SecAnnPlanDetail");
  };

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <Section style={styles.itemContainer}>
        <View style={styles.container}>
          <View style={styles.headquarters}>
            <Text style={styles.title}>GYE</Text>
          </View>
          <View style={styles.conditionInfo}>
            <View style={styles.infoText}>
              <View>
                <Text style={styles.secAnnPlanDetail}>
                  Empresa para pruebas
                </Text>
              </View>
              <View>
                <Text style={styles.secAnnPlanDetail} status={"warning"}>
                  59%
                </Text>
              </View>
            </View>
            <Text style={styles.secAnnPlanDetail} numberOfLines={1}>
              {`${secAnnPlanDetail}`}
            </Text>
            <Text style={styles.secAnnPlanDetail}>
              Diego Emilio Suárez Villagómez
            </Text>
          </View>
        </View>
      </Section>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 10,
    marginVertical: 7,
  },
  container: {
    flexDirection: "row",
    paddingVertical: 7,
  },
  headquarters: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    alignSelf: "center",
  },
  conditionInfo: {
    flex: 5,
    paddingRight: 10,
  },
  infoText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secAnnPlanDetail: {
    fontSize: 15,
    marginBottom: 5,
  },
});
