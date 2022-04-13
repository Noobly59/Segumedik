import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-rapi-ui";
import HomeMenuItem from "./HomeMenuItem";
import HomeMenuNumberItem from "./HomeMenuNumberItem";
import { getDetectedAndClosedCounters } from "../../api/substandardConditions";
import useAuth from "../../hooks/useAuth";

export default function HomeSubConSection() {
  const navigation = useNavigation();
  const { auth } = useAuth();
  const [detectedCounter, setDetectedCounter] = useState(null);
  const [closedCounter, setClosedCounter] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getDetectedAndClosedCounters(
          auth[0].headquarterId
        );
        setDetectedCounter(response.detectedCounter);
        setClosedCounter(response.closedCounter);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const goToSubCon = () => {
    navigation.navigate("SubConNavigation");
  };

  const goToAdd = () => {
    navigation.navigate("SubConNavigation", {
      screen: "AddSubstandarCondition",
    });
  };
  // console.log("counter:", counter.detectedCounter);

  return (
    <View style={styles.homeMenuInfoContainer}>
      <Text style={styles.subConText}>Condiciones Subestándar</Text>
      <View style={styles.container}>
        <View style={styles.homeMenuItem}>
          <TouchableOpacity onPress={goToSubCon} activeOpacity={0.5}>
            <HomeMenuNumberItem
              menuItemName={"Condiciones pendientes"}
              menuItemNumber={detectedCounter}
              backColor="#ffcd39"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.homeMenuItem}>
          <TouchableOpacity onPress={goToSubCon} activeOpacity={0.5}>
            <HomeMenuNumberItem
              menuItemName={"Condiciones cerradas"}
              menuItemNumber={closedCounter}
              backColor="#ffcd39"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.addSubMenuItem}>
        <TouchableOpacity onPress={goToAdd} activeOpacity={0.5}>
          <HomeMenuItem
            menuItemName="Agregar Condición Subestándar"
            backColor="#ffcd39"
            icon="add-circle"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeMenuInfoContainer: {
    marginVertical: 20,
    flexDirection: "column",
    paddingHorizontal: 12,
  },
  subConText: {
    marginBottom: 12,
    fontSize: 19,
    fontWeight: "bold",
  },
  container: {
    marginVertical: 12,
    flexDirection: "row",
    alignSelf: "center",
  },
  homeMenuItem: {
    marginHorizontal: 5,
    flex: 1,
  },
  addSubMenuItem: {
    marginHorizontal: 5,
    marginVertical: 3,
  },
});
