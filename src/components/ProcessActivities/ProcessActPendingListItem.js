import { StyleSheet, View } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  themeColor,
} from "react-native-rapi-ui";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/constants";
import { ReactNativeBackend } from "@sentry/react-native";

export default function ProcessActPendingListItem(props) {
  const { activity, reportId } = props;
  const navigation = useNavigation();

  // console.log(activity);

  const goToProcess = () => {
    switch (activity.activityId) {
      case "5e13f534-ec49-48c0-9f39-5cad1f251da9": //Investigacion y/o aviso de accidente.
      case "9ce8b60e-05e6-4e06-9110-b63e9e501985": //Control de nómina.
      case "18df8028-f0c0-4e19-ad9c-a7879a166602": //Elaboración de profesiogramas, cantidad elaborada
      case "003efb3b-3c61-46a6-99fe-83366e266fcc": //Control de matrices.
      case "8881ca10-d9a3-4731-9bc2-3e756ffb31d4": //índice de Charlas de seguridad y medio ambiente. (Diálogos Periódicos)
      case "fa7f5478-80a7-4e8a-81cc-0aa7a14e3d68": //Índice de Capacitaciones (Entrenamientos)
      case "302bf66f-863d-4b07-820c-d077035ac42e": //Ordenes de servicio.
      case "ccd8e722-b525-4ba8-abbe-a4eae562460a": //Auditoria gestion tecnica.
      case "31b39761-494e-466c-9837-803824436447": //Observaciones planeadas.
      case "32d8071c-6351-4b71-b87b-81a317d3dea3": //ACTOS Y CONDICIONES SUBESTANDAR
      case "bd8120a4-9afb-4dd8-937b-e6f67c41fd48": //Elaboracion de matrices de riesgos.
        navigation.navigate("ProcessSpecialActivities", {
          activityId: activity.activityId,
          planActivityId: activity.id,
          reportId: reportId.reportId,
          planId: reportId.planId,
          month: reportId.month,
        });
        break;
      default:
        switch (activity.category) {
          case 9:
            break;
          case 11:
            navigation.navigate("ProcessTalk", {
              planActivityId: activity.id,
              reportId: reportId.reportId,
              planId: reportId.planId,
              month: reportId.month,
            });
            break;
          default:
            navigation.navigate("ProcessActivities", {
              planActivityId: activity.id,
              reportId: reportId.reportId,
              planId: reportId.planId,
              month: reportId.month,
              category: activity.category,
            });
            break;
        }
    }
  };

  moment.updateLocale("en", {
    longDateFormat: {
      L: "DD/MM/YYYY",
    },
  });

  return (
    <TouchableWithoutFeedback
      style={styles.weeklyActivities}
      onPress={goToProcess}
    >
      <Section>
        <SectionContent
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={`${activity.relatedIcon}`}
            size={20}
            color={COLORS.primary}
          />

          <View style={{ flex: 1, marginLeft: 6 }}>
            <Text numberOfLines={1} style={styles.title}>
              {activity.name.charAt(0).toUpperCase() +
                activity.name.slice(1).toLowerCase()}
            </Text>
          </View>
          {/* <View>
            <Text numberOfLines={1} style={styles.title} status="danger">
              {activity.category}
            </Text>
          </View> */}
          <View>
            <Text style={styles.dates}>
              {activity.scheduledDate ? activity.scheduledDate : ""}
            </Text>
          </View>
        </SectionContent>
      </Section>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  weeklyActivities: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  monthlyCounter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weeklyText: {
    marginBottom: 7,
    fontWeight: "bold",
  },
  monthlyNumber: {
    marginBottom: 7,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 14,
  },
});
