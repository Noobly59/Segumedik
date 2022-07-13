import { StyleSheet, FlatList, View } from "react-native";
import ProcessActPendingListItem from "./ProcessActPendingListItem";
import { Text, themeColor } from "react-native-rapi-ui";
import { map } from "lodash";

export default function ProcessActPendingList(props) {
  const { pendingActivities, reportId } = props;
  return (
    <FlatList
      data={pendingActivities}
      numColumn={1}
      keyExtractor={(activity) => String(activity.activityId)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <ProcessActPendingListItem
          activity={item}
          reportId={reportId}
          // refresh={refresh}
        />
      )}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={() => <Text>No hay actividades</Text>}
    />
  );
}
