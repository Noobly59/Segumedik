import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SubConHeader from "../components/SubCon/SubConHeader";
import SubConList from "../components/SubCon/SubConList";
const Stack = createNativeStackNavigator();

export default function SubstandarCondition() {
  const conditions = [
    "Desorden el el área de comedor",
    "Cajetin eléctico abierto, sin señalética",
    "Filtracion de agua en paredes del consultorio medico",
    "PISO MOJADO POR LIMPIEZA DE TECHO",
    "Detector de humo se encuentra accionado",
    "Se realizó inspección de detectores de humo evidenciando que en algunas de las áreas de la empresa se encuentran inactivos, se evidencia que los detectores tienen su luz roja encendida, la cual refleja que no están activos.",
    "Personal que realiza construccion dentro de las instalaciones no cuenta con certificado de riesgos laborale s",
    "Se realizó inspección de extintores, observando la necesidad de recargar el extintor de gerencia comercial y colocar señalética del extintor ubicado en la salida de área administrativa. (Ver formato de inspección)",
    "	Se realizó inspección y detección de condiciones subestándares, evidenciando que en el baño hay la necesidad de limpieza y desinfección profunda, además de verificar si hay botes de agua en la ducha para que sea corregido.",
  ];
  return (
    <>
      <SubConHeader />
      <SubConList style={{ flex: 1 }} conditions={conditions} />
    </>
  );
}
