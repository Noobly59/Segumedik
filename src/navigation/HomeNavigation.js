import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import useAuth from "../hooks/useAuth";
import { getCompaniesAndHqName } from "../api/companiesAndHqs";
import HomeChooseCompanyAndHq from "../components/Home/HomeChooseCompanyAndHq";
import HomeMenuFooter from "../components/Home/HomeMenuFooter";
import Home from "../screens/Home";
import SubConNavigation from "./SubConNavigation";
import SecAnnPlanNavigation from "./SecAnnPlanNavigation";

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const companyAndHqName = await getCompaniesAndHqName(
        auth[0].companyId,
        auth[0].headquarterId
      );
      auth[0].companyName = companyAndHqName.companyName;
      auth[0].name = companyAndHqName.hqName;
      console.log(companyAndHqName.companyName);
    })();
  }, []);

  // console.log(auth[0]);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      <HomeChooseCompanyAndHq user={auth[0]} />
      <HomeMenuFooter logout={logout} />
    </DrawerContentScrollView>
  );
};

export default function HomeNavigation() {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ title: "Inicio" }}
        />
        <Drawer.Screen
          name="SubConNavigation"
          component={SubConNavigation}
          options={{ title: "Condiciones Subestándar" }}
        />
        <Drawer.Screen
          name="SecAnnPlanNavigation"
          component={SecAnnPlanNavigation}
          options={{ title: "Plan de vigilancia" }}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
}
