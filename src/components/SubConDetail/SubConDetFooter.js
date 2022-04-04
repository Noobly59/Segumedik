import { View } from "react-native";
import { Button, themeColor } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SubConDetFooter() {
  const navigation = useNavigation();
  const goToSubstandarCondition = () => {
    navigation.navigate("SubstandarCondition");
  };
  return (
    <View style={{ top: -25, paddingHorizontal: 5 }}>
      <Button
        text="Volver"
        color={themeColor.primary600}
        onPress={goToSubstandarCondition}
        leftContent={
          <Ionicons
            name="arrow-back-circle"
            size={20}
            color={themeColor.white}
          />
        }
      />
    </View>
  );
}
