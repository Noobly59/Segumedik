import React from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import SubConListItem from "./SubConListItem";

export default function SubConList(props) {
  const { conditions, loadSubConditions, isNext } = props;
  const [refresh, setRefresh] = useStateWithCallbackLazy(false);
  const loadMore = () => {
    loadSubConditions(false);
  };
  const handleRefresh = () => {
    setRefresh(true, (refresh) => {
      loadSubConditions(true);
      setRefresh(false);
    });
  };

  return (
    <FlatList
      data={conditions}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(subCon) => String(subCon.conditionId)}
      renderItem={({ item }) => <SubConListItem subConDetails={item} />}
      onEndReached={isNext && loadMore}
      onEndReachedThreshold={0.1}
      refreshing={refresh}
      onRefresh={handleRefresh}
      ListFooterComponent={
        isNext && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color={themeColor.primary400}
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
