import React from "react";
import SubConDetHeader from "../components/SubConDetail/SubConDetHeader";
import SubConDetTab from "../components/SubConDetail/SubConDetTab";
import SubConDetFooter from "../components/SubConDetail/SubConDetFooter";
import { SafeAreaView } from "react-native";

export default function SubConDetail(props) {
  const {
    route: { params },
  } = props;
  console.log(params);
  return (
    <>
      <SubConDetHeader
        responsibleAndDesc={{
          id: params.conditionId,
          responsible: params.responsible,
          description: params.description,
          recommendations: params.recommendations,
        }}
      />
      <SubConDetTab
        detectionDateAndEvidence={{
          detectionDate: params.detectionDate,
          detectionEvidence: params.detectionEvidence,
        }}
        closingDateAndEvidence={{
          closingDate: params.closingDate,
          closingEvidence: params.closingEvidence,
        }}
        id={params.conditionId}
      />
      <SubConDetFooter style={{ marginTop: "auto" }} />
    </>
  );
}
