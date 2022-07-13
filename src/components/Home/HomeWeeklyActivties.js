import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "react-native-rapi-ui";
import HomeMenuActList from "./HomeMenuActList";
import { COLORS } from "../../utils/constants";

export default function HomeWeeklyActivties(props) {
  const { activities, numAct, loading } = props;
  return (
    <View style={styles.weeklyActivities}>
      <View style={styles.monthlyCounter}>
        <Text style={styles.weeklyText}>Actividades Pendientes del Mes</Text>
        <Text style={styles.monthlyNumber}>{`   (${numAct})`}</Text>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={styles.spinner}
          color={COLORS.primary}
        />
      ) : (
        <HomeMenuActList activities={activities} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  weeklyActivities: {
    paddingHorizontal: 12,
    marginTop: 7,
    flex: 1,
  },
  monthlyCounter: {
    flexDirection: "row",
  },
  weeklyText: {
    marginBottom: 7,
    fontSize: 19,
    fontWeight: "bold",
  },
  monthlyNumber: {
    marginBottom: 7,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 17,
  },
  spinner: {
    marginVertical: 10,
  },
});
