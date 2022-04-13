import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default function ProccesActivitiesHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.searchStyle}>
        <Text style={styles.listTitle}>Pendientes</Text>
      </View>
      <View style={styles.addStyle}>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={20} color={themeColor.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 25,
  },
  addStyle: {
    flex: 1,
    marginRight: 1,
  },
  addButton: {
    height: 40,
    borderRadius: 10,
    backgroundColor: themeColor.primary600,
    alignItems: "center",
    justifyContent: "center",
  },
  searchStyle: {
    flex: 5,
    alignSelf: "center",
    marginLeft: 1,
  },
});
