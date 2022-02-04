import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import { getPokemonFavoriteApi } from "../api/favorite";

export default function Favorites() {
  const checkFavorites = async () => {
    const response = await getPokemonFavoriteApi();
    console.log(response);
  };
  return (
    <SafeAreaView>
      <Text>Favorites</Text>

      <Button title="Obtener favoritos" onPress={checkFavorites} />
    </SafeAreaView>
  );
}
