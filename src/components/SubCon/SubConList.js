import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-rapi-ui";
import SubConListItem from "./SubConListItem";

export default function SubConList(props) {
  const { conditions } = props;

  return (
    <>
      {conditions ? (
        <FlatList
          data={conditions}
          numColumns={1}
          showsVerticalScrollIndicator={true}
          keyExtractor={(subCon) => String(subCon.id)}
          renderItem={({ item }) => <SubConListItem subConDetails={item} />}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <Text>No hay</Text>
      )}
    </>
  );
}
