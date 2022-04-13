import { Button, Text, themeColor } from "react-native-rapi-ui";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeMenuFooter(props) {
  const { logout } = props;
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: "auto", paddingHorizontal: 7 }}>
      <View style={{ marginVertical: 3 }}>
        <Button
          text="Cambiar Empresa"
          color={themeColor.gray300}
          onPress={navigation.goBack}
        />
      </View>
      <View style={{ marginVertical: 3 }}>
        <Button text="Cerrar Sesión" status="danger" onPress={logout} />
      </View>
    </View>
  );
}
