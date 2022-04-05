import { View, StyleSheet } from "react-native";
import { Text } from "react-native-rapi-ui";
import HomeMenuActList from "./HomeMenuActList";

export default function HomeWeeklyActivties(props) {
  const { activities, numAct } = props;
  return (
    <View style={styles.weeklyActivities}>
      <View style={styles.monthlyCounter}>
        <Text style={styles.weeklyText}>Actividades Planificadas del Mes</Text>
        <Text style={styles.monthlyNumber}>{`${numAct} act. este mes`}</Text>
      </View>
      {activities ? (
        <HomeMenuActList activities={activities} />
      ) : (
        <Text>No ahi</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  weeklyActivities: {
    paddingHorizontal: 12,
    marginTop: 5,
    flex: 1,
  },
  monthlyCounter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weeklyText: {
    marginBottom: 7,
    fontWeight: "bold",
  },
  monthlyNumber: {
    marginBottom: 7,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 14,
  },
});
