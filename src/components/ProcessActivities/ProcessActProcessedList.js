import { StyleSheet, FlatList, ScrollView, View } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";

import ProcessActProcessedListItem from "./ProcessActProcessedListItem";
import { map } from "lodash";

export default function ProcessActProcessedList(props) {
  const { processedActivities } = props;
  return (
    <FlatList
      data={processedActivities}
      numColumn={1}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ProcessActProcessedListItem activity={item} />}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={() => <Text>No hay actividades</Text>}
    />
  );
}
