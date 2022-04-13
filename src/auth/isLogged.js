import React from "react";
import useAuth from "../hooks/useAuth";
import Login from "../screens/Login";
import Navigation from "../navigation/Navigation";
import SubstandarCondition from "../screens/SubstandarCondition";

export default function IsLogged() {
  const { auth } = useAuth();
  return <>{auth ? <Navigation /> : <Login></Login>}</>;
  // return <>{auth ? <Login /> : <Navigation />}</>;
  // return <>{auth ? <Login /> : <SubstandarCondition />}</>;
}
