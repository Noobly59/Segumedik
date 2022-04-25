import { StyleSheet } from "react-native";
import { Section, SectionContent, Text } from "react-native-rapi-ui";
import { COLORS } from "../../utils/constants";

export default function HomeMenuNumberItem(props) {
  const { menuItemNumber, menuItemName, backColor } = props;
  // console.log(menuItemName.number);
  return (
    <Section>
      <SectionContent style={{ backgroundColor: backColor }}>
        <Text style={styles.title}>{menuItemNumber ? menuItemNumber : 0}</Text>
        <Text style={styles.body}>{menuItemName}</Text>
      </SectionContent>
    </Section>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.white,
  },
  body: {
    fontSize: 17,
    textAlign: "center",
    color: COLORS.white,
  },
});
