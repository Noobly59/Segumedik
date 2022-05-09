import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function TalkTakePicture(props) {
  const navigation = useNavigation();
  const {
    route: { params },
  } = props;
  console.log(params);
  return (
    <View>
      <Text>TalkTakePicture</Text>
    </View>
  );
}
