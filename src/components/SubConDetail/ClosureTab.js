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
import { Image } from "react-native";
import moment from "moment";

export default function ClosureTab(props) {
  const {
    route: { params },
  } = props;
  const cloEvidenceUrl = `http://sso.segumedik.com/${params.closingDateAndEvidence.closingEvidence}`;
  return (
    <Section style={{ top: 7 }}>
      <SectionContent>
        <Text style={{ fontSize: 18 }}>{`Fecha de detección: ${
          params.closingDateAndEvidence.closingDate
            ? moment(params.closingDateAndEvidence.closingDate).format("L")
            : "N/A"
        }`}</Text>

        {params.closingDateAndEvidence.closingEvidence ? (
          <Image
            source={{ uri: cloEvidenceUrl }}
            style={{
              width: "95%",
              height: "95%",
              alignSelf: "center",
              bottom: -16,
            }}
          />
        ) : (
          <SectionContent>
            <Button
              text="Tomar foto"
              color={themeColor.primary600}
              rightContent={
                <Ionicons name="camera" size={30} color={themeColor.white} />
              }
            />
          </SectionContent>
        )}
      </SectionContent>

      {/* <Button
          text="Tomar foto"
          color={themeColor.primary600}
          rightContent={
            <Ionicons name="camera" size={20} color={themeColor.white} />
          }
        /> */}
    </Section>
  );
}
