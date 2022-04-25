import { View } from "react-native";
import { Button, themeColor } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../utils/constants";

export default function SubConDetFooter() {
  const navigation = useNavigation();
  const goToSubstandarCondition = () => {
    navigation.navigate("SubstandarCondition");
  };
  return (
    <View style={{ top: -7, paddingHorizontal: 5 }}>
      <Button
        text="Volver"
        color={COLORS.primary}
        onPress={goToSubstandarCondition}
        leftContent={
          <Ionicons name="arrow-back-circle" size={30} color={COLORS.white} />
        }
      />
    </View>
  );
}
