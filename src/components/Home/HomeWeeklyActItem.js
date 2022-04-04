import { StyleSheet } from "react-native";
import { Section, SectionContent, Text } from "react-native-rapi-ui";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function HomeWeeklyActItem(props) {
  const { menuItemName } = props;
  const navigation = useNavigation();
  const goToSecAnnPlan = () => {
    navigation.navigate("SecAnnPlanNavigation");
  };
  return (
    <TouchableWithoutFeedback onPress={goToSecAnnPlan}>
      <Section style={styles.container}>
        <SectionContent>
          <Text style={styles.title}>{menuItemName}</Text>
        </SectionContent>
      </Section>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
  },
  title: {
    fontSize: 15,
    textAlign: "center",
  },
});
