import { View, StyleSheet } from "react-native";
import { Text } from "react-native-rapi-ui";
import HomeMenuActList from "./HomeMenuActList";

export default function HomeWeeklyActivties(props) {
  const { activities } = props;
  return (
    <View style={styles.weeklyActivities}>
      <Text style={styles.weeklyText}>Actividades Semanales</Text>
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
  weeklyText: {
    marginBottom: 12,
  },
});
