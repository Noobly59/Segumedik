import { StyleSheet } from "react-native";
import { Section, SectionContent, Text } from "react-native-rapi-ui";

export default function HomeMenuItem(props) {
  const { menuItemName } = props;
  return (
    <Section>
      <SectionContent>
        <Text style={styles.title}>{menuItemName}</Text>
      </SectionContent>
    </Section>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    textAlign: "center",
  },
});
