import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Favorites from '../screens/Favorites';

const Stack = createNativeStackNavigator();

export default function FavoritesNavigation() {
  return (
      <Stack.Navigator>
          <Stack.Screen name = "Favorite" component = {Favorites} options={{ title: "Favoritos" }}/>
      </Stack.Navigator>
  );
}
