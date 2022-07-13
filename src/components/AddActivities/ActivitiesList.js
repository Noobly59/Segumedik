import React from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import ActivitiesListItem from "./ActivitiesListItem";
import { COLORS } from "../../utils/constants";

export default function ActivitiesList(props) {
  const { activities, loadActivities, isNext, planId } = props;
  const [refresh, setRefresh] = useStateWithCallbackLazy(false);
  const loadMore = () => {
    loadActivities(false);
  };
  const handleRefresh = () => {
    setRefresh(true, (refresh) => {
      loadActivities(true);
      setRefresh(false);
    });
  };

  return (
    <FlatList
      data={activities}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(activities) => String(activities.activityId)}
      renderItem={({ item }) => (
        <ActivitiesListItem activitiesDetails={item} planId={planId} />
      )}
      onEndReached={isNext && loadMore}
      onEndReachedThreshold={0.1}
      refreshing={refresh}
      onRefresh={handleRefresh}
      ListEmptyComponent={() => <Text>No hay actividades</Text>}
      ListFooterComponent={
        isNext && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color={COLORS.primary}
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    marginVertical: 10,
  },
});
/* {conditions ? ( */
/* ) : (
        <Text>No hay</Text>
      )} */
