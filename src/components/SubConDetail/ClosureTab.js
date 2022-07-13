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
import { COLORS } from "../../utils/constants";

export default function ClosureTab(props) {
  const {
    route: { params },
  } = props;
  const navigation = useNavigation();

  const goToAddClosingPicture = () => {
    navigation.navigate("AddClosingPicture", { id: params.id });
  };

  // console.log(params.closingDateAndEvidence.closingEvidence);

  const [closingEvidenceUrl, setClosingEvidenceUrl] = useState(null);
  const [url, setUrl] = useState(null);
  const [closingDate, setClosingDate] = useState(null);
  const [imageExists, setImageExists] = useState(true);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await loadSubConDetail();
      })();
    })
  );

  const loadSubConDetail = async () => {
    try {
      const response = await getSubConDetail(params.id);
      setUrl(response[0].closingEvidence);
      setClosingDate(response[0].closingDate);
      url
        ? setClosingEvidenceUrl(
            url.charAt(0) !== "h"
              ? `http://sso.segumedik.com/${response[0].closingEvidence}`
              : `${response[0].closingEvidence}`
          )
        : setClosingEvidenceUrl(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await verifyImageExistance();
  });

  const verifyImageExistance = async () => {
    try {
      const response = await fetch(closingEvidenceUrl);
      await response.formData();
      setImageExists(true);
    } catch (error) {
      setImageExists(false);
    }
  };

  return (
    <Section style={{ top: 7 }}>
      <SectionContent>
        <Text style={{ fontSize: 18 }}>{`Fecha de detección: ${
          closingEvidenceUrl ? moment(closingDate).format("L") : "N/A"
        }`}</Text>

        {closingEvidenceUrl ? (
          imageExists ? (
            <Image
              source={{ uri: closingEvidenceUrl }}
              resizeMode="contain"
              style={{
                width: "95%",
                height: "95%",
                alignSelf: "center",
                bottom: -16,
              }}
            />
          ) : (
            <Text>Imagen no encontrada...</Text>
          )
        ) : (
          <SectionContent>
            <Button
              text="Tomar foto"
              onPress={goToAddClosingPicture}
              color={COLORS.primary}
              rightContent={
                <Ionicons name="camera" size={30} color={COLORS.white} />
              }
            />
          </SectionContent>
        )}
      </SectionContent>
    </Section>
  );
}
