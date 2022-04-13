import React, { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  View,
} from "react-native";
import { Text, SectionContent } from "react-native-rapi-ui";
import SecAnnPlanItem from "./SecAnnPlanItem";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function SecAnnPlanList(props) {
  const { annualPlans } = props;
  const [open, setopen] = useState(false);
  const [icon, setIcon] = useState(true);
  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setopen(!open);
    setIcon(!icon);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={onPress} activeOpacity={1}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            marginVertical: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Ver Planes Anteriores
          </Text>
          <Ionicons name={icon ? "caret-down" : "caret-up"} size={20} />
        </View>
      </TouchableWithoutFeedback>
      <View style={[{ flex: 1 }, !open && { display: "none" }]}>
        {open && (
          <View>
            {annualPlans ? (
              <FlatList
                data={annualPlans}
                numColumns={1}
                keyExtractor={(plan) => [plan.id]}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => (
                  <SecAnnPlanItem secAnnPlanDetail={item.title} />
                )}
                onEndReachedThreshold={0.1}
              />
            ) : (
              <Text>No ahi</Text>
            )}
          </View>
        )}
      </View>
    </>
  );
}
