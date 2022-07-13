import React, { useState, useEffect } from "react";
import ActivitiesListHeader from "../components/AddActivities/ActivitiesListHeader";
import ActivitiesList from "../components/AddActivities/ActivitiesList";
import { getActivities } from "../api/securityAnnualPlans";
import useAuth from "../hooks/useAuth";
import { SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import { filter } from "lodash";
import { COLORS } from "../utils/constants";

export default function AddActivities(props) {
  const [activities, setActivities] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const {
    route: { params },
  } = props;

  useEffect(() => {
    (async () => {
      await loadActivities(false);
    })();
  }, []);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = filter(fullData, (activity) => {
      return contains(activity, formattedQuery);
    });
    setActivities(data);
    setQuery(text);
  };

  const contains = ({ name }, query) => {
    const nameToLower = name.toLowerCase();
    if (nameToLower.includes(query)) {
      return true;
    }
    return false;
  };

  const loadActivities = async (firstPageReload) => {
    try {
      const response = await getActivities(firstPageReload ? null : nextUrl);
      // console.log(response);
      setNextUrl(response.next);
      const activitiesArray = [];
      for await (const activity of response.activities) {
        activitiesArray.push({
          activityId: activity.activityId,
          name: activity.name,
          isRequired: activity.isRequired,
          isActive: activity.isActive,
          relatedIcon: activity.relatedIcon,
        });
      }
      firstPageReload
        ? (setActivities([...activitiesArray]),
          setFullData([...activitiesArray]))
        : (setActivities([...activities, ...activitiesArray]),
          setFullData([...fullData, ...activitiesArray]));
      setLoading(false);
    } catch (error) {
      console.error("list ", error);
    }
  };

  return (
    <SafeAreaView style={{ paddingBottom: 70 }}>
      <ActivitiesListHeader handleSearch={handleSearch} />
      {loading ? (
        <ActivityIndicator
          size="large"
          style={styles.spinner}
          color={COLORS.primary}
        />
      ) : (
        <ActivitiesList
          style={{ flex: 1 }}
          activities={activities}
          loadActivities={loadActivities}
          isNext={nextUrl}
          planId={params.planId}
          refreshPending={params.refresh}
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
