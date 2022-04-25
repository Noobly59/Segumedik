import { Button, Text, themeColor } from "react-native-rapi-ui";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../utils/constants";

export default function HomeMenuFooter(props) {
  const { logout } = props;
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: "auto", paddingHorizontal: 7 }}>
      <View style={{ marginVertical: 3 }}>
        <Button
          text="Cambiar Empresa"
          color={COLORS.neutral}
          onPress={navigation.goBack}
        />
      </View>
      <View style={{ marginVertical: 3 }}>
        <Button text="Cerrar Sesión" color={COLORS.danger} onPress={logout} />
      </View>
    </View>
  );
}
