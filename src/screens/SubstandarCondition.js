import React, { useState, useEffect } from "react";
import SubConHeader from "../components/SubCon/SubConHeader";
import SubConList from "../components/SubCon/SubConList";
import { getSubCons } from "../api/substandardConditions";
import useAuth from "../hooks/useAuth";
import { SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import { filter } from "lodash";
import { COLORS } from "../utils/constants";

export default function SubstandarCondition() {
  const [subCons, setSubCons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      await loadSubConditions(false);
    })();
  }, []);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = filter(fullData, (condition) => {
      return contains(condition, formattedQuery);
    });
    setSubCons(data);
    setQuery(text);
  };

  const contains = ({ description, responsible }, query) => {
    const descriptionToLower = description.toLowerCase();
    const responsibleToLower = responsible.toLowerCase();
    if (
      descriptionToLower.includes(query) ||
      responsibleToLower.includes(query)
    ) {
      return true;
    }
    return false;
  };

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
          closingOrientation: null,
          recommendations:
            subCon.recommendations === "" ? "N/A" : subCon.recommendations,
        });
      }
      firstPageReload
        ? (setSubCons([...subConsArray]), setFullData([...subConsArray]))
        : (setSubCons([...subCons, ...subConsArray]),
          setFullData([...fullData, ...subConsArray]));
      setLoading(false);
    } catch (error) {
      console.error("list ", error);
    }
  };

  return (
    <SafeAreaView style={{ paddingBottom: 70 }}>
      <SubConHeader handleSearch={handleSearch} />
      {loading ? (
        <ActivityIndicator
          size="large"
          style={styles.spinner}
          color={COLORS.primary}
        />
      ) : (
        <SubConList
          style={{ flex: 1 }}
          conditions={subCons}
          loadSubConditions={loadSubConditions}
          isNext={nextUrl}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spinner: {
    marginVertical: 10,
  },
});
