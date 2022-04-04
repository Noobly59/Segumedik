import { FlatList } from "react-native";
import HomeWeeklyActItem from "./HomeWeeklyActItem";

export default function HomeMenuActList(props) {
  const { activities } = props;
  return (
    <FlatList
      data={activities}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <HomeWeeklyActItem menuItemName={item} />}
      onEndReachedThreshold={0.1}
    />
  );
}