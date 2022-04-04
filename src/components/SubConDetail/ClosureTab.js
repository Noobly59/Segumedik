import React from "react";
import {
  Button,
  Section,
  SectionContent,
  SectionImage,
  Text,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ClosureTab() {
  return (
    <Section style={{ top: 7 }}>
      <SectionContent>
        <Text>{`Fecha de detección: N/A`}</Text>
      </SectionContent>
      <SectionContent>
        <Button
          text="Tomar foto"
          color={themeColor.primary600}
          rightContent={
            <Ionicons name="camera" size={20} color={themeColor.white} />
          }
        />
      </SectionContent>
    </Section>
  );
}
