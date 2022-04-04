import {
  Section,
  SectionContent,
  SectionImage,
  Text,
} from "react-native-rapi-ui";

export default function DetectionTab() {
  return (
    <Section style={{ top: 7 }}>
      <SectionContent>
        <Text>{`Fecha de detección: 30/03/2022`}</Text>
      </SectionContent>
      <SectionImage
        height={350}
        source={require("../../assets/extintor.jpg")}
      />
    </Section>
  );
}
