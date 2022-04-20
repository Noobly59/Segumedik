import React, { useState, useEffect } from "react";
import SubConHeader from "../components/SubCon/SubConHeader";
import SubConList from "../components/SubCon/SubConList";
import { getSubCons } from "../api/substandardConditions";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native";

export default function SubstandarCondition() {
  const [subCons, setSubCons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      await loadSubConditions(false);
    })();
  }, []);

  const loadSubConditions = async (firstPageReload) => {
    try {
      const response = await getSubCons(
        // "7bac58bc-59f6-4ea1-8e73-3fa3e6ada2ab"
        auth[0].headquarterId,
        firstPageReload ? null : nextUrl
      );

      setNextUrl(response.next);
      const subConsArray = [];
      for await (const subCon of response.conditions) {
        subConsArray.push({
          conditionId: subCon.conditionId,
          headquarterId: subCon.headquarterId,
          description: subCon.description,
          detectionDate: subCon.detectionDate,
          detectionEvidence: subCon.detectionEvidence,
          responsible: subCon.responsible,
          closingDate: subCon.closingDate,
          closingEvidence: subCon.closingEvidence,
          deadline: subCon.deadline,
          conditionStatus: subCon.conditionStatus,
          recommendations:
            subCon.recommendations === "" ? "N/A" : subCon.recommendations,
        });
      }
      firstPageReload
        ? setSubCons([...subConsArray])
        : setSubCons([...subCons, ...subConsArray]);
    } catch (error) {
      console.error("list ", error);
    }
  };

  return (
    <SafeAreaView style={{ paddingBottom: 70 }}>
      <SubConHeader />
      <SubConList
        style={{ flex: 1 }}
        conditions={subCons}
        loadSubConditions={loadSubConditions}
        isNext={nextUrl}
      />
    </SafeAreaView>
  );
}
