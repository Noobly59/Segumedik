import { StyleSheet } from "react-native";
import { Section, SectionContent, Text } from "react-native-rapi-ui";

export default function HomeMenuNumberItem(props) {
  const { menuItemName, backColor } = props;
  console.log(menuItemName.number);
  return (
    <Section>
      <SectionContent style={{ backgroundColor: backColor }}>
        <Text style={styles.title}>{menuItemName.number}</Text>
        <Text style={styles.body}>{menuItemName.text}</Text>
      </SectionContent>
    </Section>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  body: {
    fontSize: 15,
    textAlign: "center",
  },
});
