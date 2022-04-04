import { View, StyleSheet } from "react-native";
import { Section, Text } from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function SubConListItem(props) {
  const { subConDetail } = props;
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("SubConDetail");
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
                <Text style={styles.subConDetail}>21-03-2022</Text>
              </View>
              <View>
                <Text style={styles.subConDetail} status={"warning"}>
                  Corto plazo
                </Text>
              </View>
            </View>
            <Text style={styles.subConDetail} numberOfLines={1}>
              {`${subConDetail}`}
            </Text>
            <Text style={styles.subConDetail}>
              Diego Emilio Suárez Villagómez
            </Text>
            <Text style={styles.subConDetail} status={"success"}>
              Ejecutada
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
  subConDetail: {
    fontSize: 15,
    marginBottom: 5,
  },
});