import React from 'react';
import { Image, requireNativeComponent } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from 'react-native-vector-icons/FontAwesome5';
import FavoritesNavigation from './FavoritesNavigation';
import PokedexNavigation from './PokedexNavigation';
import AccountNavigation from './AccountNavigation';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
      <Tab.Navigator>
          <Tab.Screen 
            name="Favorites" 
            component={FavoritesNavigation} 
            options={{
                tabBarLabel: "Favoritos",
                tabBarIcon: ({color, size}) => <Icon name="heart" color={color} size={size}/>,
                headerShown: false,
            }}
          />
          <Tab.Screen 
            name="Pokedex" 
            component={PokedexNavigation} 
            options={{
                tabBarLabel: "",
                tabBarIcon: () => renderPokeball(),
                headerShown: false,
            }}
          />
          <Tab.Screen 
            name="Account" 
            component={AccountNavigation}
            options={{
                tabBarLabel: "Mi Cuenta",
                tabBarIcon: ({color, size}) => <Icon name = "user" color={color} size={size}/>, 
                headerShown: false,
            }}  
          />
      </Tab.Navigator>
  );
}

function renderPokeball() {
    return (
        <Image 
            source={require('../assets/pokeball.png')}
            style={{width: 75, height: 75, top: -20}}
        />
    );
}
