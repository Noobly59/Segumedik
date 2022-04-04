import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "react-native-rapi-ui";

export default function SecAnnPlanYearPicker() {
  const [pickerValue, setPickerValue] = useState(null);
  const items = [
    { label: "2023", value: "23" },
    { label: "2022", value: "22" },
    { label: "2021", value: "21" },
    { label: "2020", value: "20" },
  ];
  return (
    <View style={styles.searchStyle}>
      <Picker
        items={items}
        value={pickerValue}
        placeholder="Año"
        onValueChange={(val) => setPickerValue(val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchStyle: {
    marginHorizontal: 7,
    marginVertical: 5,
  },
});
