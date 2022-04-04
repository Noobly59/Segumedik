import { FlatList } from "react-native";
import { Text } from "react-native-rapi-ui";
import SecAnnPlanItem from "./SecAnnPlanItem";

export default function SecAnnPlanList(props) {
  const { annualPlans } = props;

  return (
    <>
      {annualPlans ? (
        <FlatList
          data={annualPlans}
          numColumns={1}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => <SecAnnPlanItem secAnnPlanDetail={item} />}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <Text>No ahi</Text>
      )}
    </>
  );
}
