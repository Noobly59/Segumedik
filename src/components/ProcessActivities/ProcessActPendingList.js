import { StyleSheet, FlatList, ScrollView, View } from "react-native";
import ProcessActPendingListItem from "./ProcessActPendingListItem";
import { Text, themeColor } from "react-native-rapi-ui";
import { map } from "lodash";

export default function ProcessActPendingList(props) {
  const { pendingActivities } = props;
  return (
    // <FlatList
    //   data={pendingActivities}
    //   numColumn={1}
    //   showsVerticalScrollIndicator={false}
    //   renderItem={({ item }) => (
    //     <ProcessActPendingListItem activityName={item} />
    //   )}
    //   onEndReachedThreshold={0.1}
    // />
    <ScrollView style={styles.container}>
      {pendingActivities ? (
        map(pendingActivities, (item, index) => (
          <View key={index} style={styles.listItem}>
            <ProcessActPendingListItem activity={item} />
          </View>
        ))
      ) : (
        <Text>No hay</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  listItem: { marginVertical: 5 },
});
