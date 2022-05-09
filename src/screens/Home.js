import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import HomeMenuItemContainer from "../components/Home/HomeMenuItemContainer";
import HomePercentageCompleted from "../components/Home/HomePercentageCompleted";
import HomeSubConSection from "../components/Home/HomeSubConSection";
import HomeWeeklyActivties from "../components/Home/HomeWeeklyActivties";
import { getCompaniesAndHqName } from "../api/companiesAndHqs";
import useAuth from "../hooks/useAuth";
import { getMonthActivities } from "../api/securityAnnualPlans";

export default function Home() {
  const { auth } = useAuth();
  const [activities, setActivties] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await loadActivities();
    })();
  }, []);

  const loadActivities = async () => {
    try {
      const response = await getMonthActivities(auth[0].headquarterId);
      setActivties(response ? response["activities"] : []);
      setCount(response ? response["count"] : 0);
      setLoading(false);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomePercentageCompleted />
      <HomeSubConSection />
      <HomeMenuItemContainer />
      <HomeWeeklyActivties
        activities={activities}
        numAct={count}
        loading={loading}
      />
    </SafeAreaView>
  );

  // import useAuth from "../hooks/useAuth";
  // const { auth, logout } = useAuth();
  //<Button text="Cerrar sesión"type="TouchableOpacity"onPress={() => {logout();}}/>
}
