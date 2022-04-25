import { StyleSheet } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/constants";

export default function HomeMenuItem(props) {
  const { menuItemName, backColor, icon } = props;
  return (
    <Section>
      <SectionContent
        style={{
          backgroundColor: backColor,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name={`${icon}`} size={25} color={COLORS.white} />

        <Text style={styles.title}>{menuItemName}</Text>
      </SectionContent>
    </Section>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.white,
    // color: "white",
  },
});
