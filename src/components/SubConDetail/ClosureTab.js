import React, { useCallback, useState, useEffect } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { getSubConDetail } from "../../api/substandardConditions";

export default function ClosureTab(props) {
  const {
    route: { params },
  } = props;
  const navigation = useNavigation();

  const goToAddClosingPicture = () => {
    navigation.navigate("AddClosingPicture", { id: params.id });
  };

  console.log(params.closingDateAndEvidence.closingEvidence);

  // const [firstLetter, setFirstLetter] = useState("");
  const [closingEvidenceUrl, setClosingEvidenceUrl] = useState(null);
  const [url, setUrl] = useState(null);
  const [closingDate, setClosingDate] = useState(null);
  useFocusEffect(
    useCallback(() => {
      // console.log("asdlasd");
      (async () => {
        await loadSubConDetail();
      })();
      // setFirstLetter(params.closingDateAndEvidence.closingEvidence?.charAt(0));
      // params.closingDateAndEvidence.closingEvidence
      //   ? setClosingEvidenceUrl(
      //       firstLetter !== "h"
      //         ? `http://sso.segumedik.com/${params.closingDateAndEvidence.closingEvidence}`
      //         : `${params.closingDateAndEvidence.closingEvidence}`
      //     )
      // : setClosingEvidenceUrl(null);
    })
  );

  const loadSubConDetail = async () => {
    try {
      const response = await getSubConDetail(params.id);
      setUrl(response[0].closingEvidence);
      setClosingDate(response[0].closingDate);
      url
        ? setClosingEvidenceUrl(
            url.charAt(0) !== "h" ? `http://sso.segumedik.com/${url}` : `${url}`
          )
        : setClosingEvidenceUrl(null);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   console.log("asdasd");
  //   console.log(url?.charAt(0), closingEvidenceUrl);
  // });
  // const firstLetter = params.closingDateAndEvidence.closingEvidence?.charAt(0);

  // const cloEvidenceUrl =
  //   firstLetter !== "h"
  //     ? `http://sso.segumedik.com/${params.closingDateAndEvidence.closingEvidence}`
  //     : `${params.closingDateAndEvidence.closingEvidence}`;

  return (
    <Section style={{ top: 7 }}>
      <SectionContent>
        <Text style={{ fontSize: 18 }}>{`Fecha de detección: ${
          closingEvidenceUrl ? moment(closingDate).format("L") : "N/A"
        }`}</Text>

        {closingEvidenceUrl ? (
          <Image
            source={{ uri: closingEvidenceUrl }}
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
              onPress={goToAddClosingPicture}
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
