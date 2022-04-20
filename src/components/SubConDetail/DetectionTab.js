import {
  Section,
  SectionContent,
  SectionImage,
  Text,
} from "react-native-rapi-ui";
import moment from "moment";
import { Image } from "react-native";

export default function DetectionTab(props) {
  const {
    route: { params },
  } = props;

  const firstLetter =
    params.detectionDateAndEvidence.detectionEvidence?.charAt(0);

  const detEvidenceUrl =
    firstLetter !== "h"
      ? `http://sso.segumedik.com/${params.detectionDateAndEvidence.detectionEvidence}`
      : `${params.detectionDateAndEvidence.detectionEvidence}`;

  return (
    <Section style={{ top: 7 }}>
      <SectionContent>
        <Text style={{ fontSize: 18 }}>{`Fecha de detección: ${moment(
          params.detectionDateAndEvidence.detectionDate
        ).format("L")}`}</Text>
        <Image
          source={{ uri: detEvidenceUrl }}
          style={{
            width: "95%",
            height: "95%",
            alignSelf: "center",
            bottom: -16,
          }}
        />
      </SectionContent>
      {/* <SectionImage height={870} source={{ uri: detEvidenceUrl }} /> */}
    </Section>
  );
}
