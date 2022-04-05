import { StyleSheet, FlatList, ScrollView, View } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";

import ProcessActPendingListItem from "./ProcessActPendingListItem";
import { map } from "lodash";

export default function ProcessActProcessedList(props) {
  const { processedActivities } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>Procesadas</Text>
      <ScrollView style={styles.itemContainer}>
        {processedActivities ? (
          map(processedActivities, (item, index) => (
            <View key={index} style={styles.listItem}>
              <ProcessActPendingListItem activity={item} />
            </View>
          ))
        ) : (
          <Text>No hay</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 25,
    paddingHorizontal: 10,
  },
  itemContainer: { marginVertical: 5, paddingHorizontal: 10 },
  listItem: { marginVertical: 5 },
});
