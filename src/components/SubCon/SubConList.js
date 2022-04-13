import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import SubConListItem from "./SubConListItem";

export default function SubConList(props) {
  const { conditions, loadSubConditions, isNext } = props;
  const loadMore = () => {
    loadSubConditions();
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
