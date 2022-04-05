// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SubConHeader from "../components/SubCon/SubConHeader";
import SubConList from "../components/SubCon/SubConList";
// const Stack = createNativeStackNavigator();
import { themeColor } from "react-native-rapi-ui";

export default function SubstandarCondition() {
  const conditions = [
    {
      id: "1",
      text: "Desorden el el área de comedor",
      term: "Inmediatamente",
      status: "Pendiente",
      termColor: "danger",
      statusColor: "danger",
    },

    {
      id: "2",
      text: "Filtracion de agua en paredes del consultorio medico",
      term: "Mediano Plazo",
      status: "Pendiente",
      termColor: "warning",
      statusColor: "danger",
    },
    {
      id: "3",
      text: "Cajetin eléctico abierto, sin señalética",
      term: "Corto Plazo",
      status: "Ejecutada",
      termColor: "warning",
      statusColor: "success600",
    },
    {
      id: "4",
      text: "PISO MOJADO POR LIMPIEZA DE TECHO",
      term: "Largo Plazo",
      status: "Ejecutada",
      termColor: "success600",
      statusColor: "success600",
    },
    {
      id: "5",
      text: "Se realizó inspección de detectores de humo evidenciando que en algunas de las áreas de la empresa se encuentran inactivos, se evidencia que los detectores tienen su luz roja encendida, la cual refleja que no están activos.",
      term: "Corto Plazo",
      status: "Ejecutada",
      termColor: "warning",
      statusColor: "success600",
    },
    {
      id: "6",
      text: "Personal que realiza construccion dentro de las instalaciones no cuenta con certificado de riesgos laborales",
      term: "Corto Plazo",
      status: "Ejecutada",
      termColor: "warning",
      statusColor: "success600",
    },
    {
      id: "7",
      text: "Se realizó inspección de extintores, observando la necesidad de recargar el extintor de gerencia comercial y colocar señalética del extintor ubicado en la salida de área administrativa. (Ver formato de inspección)",
      term: "Corto Plazo",
      status: "Ejecutada",
      termColor: "warning",
      statusColor: "success600",
    },
    {
      id: "8",
      text: "Se realizó inspección y detección de condiciones subestándares, evidenciando que en el baño hay la necesidad de limpieza y desinfección profunda, además de verificar si hay botes de agua en la ducha para que sea corregido.",
      term: "Corto Plazo",
      status: "Ejecutada",
      termColor: "warning",
      statusColor: "success600",
    },
  ];
  return (
    <>
      <SubConHeader />
      <SubConList style={{ flex: 1 }} conditions={conditions} />
    </>
  );
}
