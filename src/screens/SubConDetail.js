import React from "react";
import SubConDetHeader from "../components/SubConDetail/SubConDetHeader";
import SubConDetTab from "../components/SubConDetail/SubConDetTab";
import SubConDetFooter from "../components/SubConDetail/SubConDetFooter";

export default function SubConDetail(props) {
  const {
    route: { params },
  } = props;
  return (
    <>
      <SubConDetHeader
        responsibleAndDesc={{
          responsible: params.responsible,
          description: params.description,
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
      />
      <SubConDetFooter />
    </>
  );
}
