import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { TextInput, themeColor } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function SubConHeader() {
  const navigation = useNavigation();

  const goToAddSubCon = () => {
    navigation.navigate("AddSubstandarCondition");
  };

  return (
    <View style={styles.container}>
      <View style={styles.addStyle}>
        <TouchableWithoutFeedback
          style={styles.addButton}
          onPress={goToAddSubCon}
        >
          <Ionicons name="add-circle" size={30} color={themeColor.white} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.searchStyle}>
        <TextInput
          autoCapitalize="none"
          rightContent={
            <Ionicons name="search" size={30} color={themeColor.primary700} />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 7,
    flexDirection: "row",
  },
  addStyle: {
    flex: 1,
    marginRight: 1,
  },
  addButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: themeColor.primary600,
    alignItems: "center",
    justifyContent: "center",
  },
  searchStyle: {
    flex: 5,
    marginLeft: 1,
  },
});
