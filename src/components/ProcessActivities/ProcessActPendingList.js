import { StyleSheet, FlatList, View } from "react-native";
import ProcessActPendingListItem from "./ProcessActPendingListItem";
import { Text, themeColor } from "react-native-rapi-ui";
import { map } from "lodash";

export default function ProcessActPendingList(props) {
  const { pendingActivities } = props;
  return (
    <FlatList
      data={pendingActivities}
      numColumn={1}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ProcessActPendingListItem activity={item} />}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={() => <Text>No hay actividades</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 3,
  },

  listItem: { marginVertical: 5 },
});
