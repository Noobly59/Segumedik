import { StyleSheet } from "react-native";
import { Section, SectionContent, Text } from "react-native-rapi-ui";

export default function ProcessActPendingListItem(props) {
  const { activityName } = props;
  return (
    <Section>
      <SectionContent>
        <Text style={{ fontSize: 14 }}>{activityName}</Text>
      </SectionContent>
    </Section>
  );
}
