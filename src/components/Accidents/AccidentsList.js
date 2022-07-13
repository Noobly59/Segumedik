import React from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import { COLORS } from "../../utils/constants";
import AccidentsListItem from "./AccidentsListItem";

export default function AccidentsList(props) {
  const { accidents } = props;

  return (
    <FlatList
      data={accidents}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(accident) => String(accident.Id)}
      renderItem={({ item }) => <AccidentsListItem accident={item} />}
      ListEmptyComponent={() => <Text>No hay accidentes</Text>}
    />
  );
}
