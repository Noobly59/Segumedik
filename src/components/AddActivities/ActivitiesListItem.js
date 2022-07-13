import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  themeColor,
} from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/constants";

export default function ActivitiesListItem(props) {
  const { activitiesDetails, planId } = props;
  const navigation = useNavigation();
  console.log(activitiesDetails);
  const goToDetail = () => {
    navigation.navigate("AddActivity", {
      activity: activitiesDetails,
      planId: planId,
    });
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={goToDetail}
      activeOpacity={0.5}
    >
      <Section>
        <View style={styles.container}>
          <View style={styles.activityInfo}>
            <View style={styles.infoText}>
              <Ionicons
                name={`${activitiesDetails.relatedIcon}`}
                size={30}
                color={COLORS.primary}
              />
              <View style={{ flex: 1, marginLeft: 6 }}>
                <Text numberOfLines={1} style={styles.title}>
                  {activitiesDetails.name.charAt(0).toUpperCase() +
                    activitiesDetails.name.slice(1).toLowerCase()}
                </Text>
              </View>
              <View>
                <Text style={styles.dates}>{activitiesDetails.isRequired}</Text>
              </View>
            </View>
          </View>
        </View>
      </Section>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  // headquarters: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // title: {
  //   fontSize: 15,
  //   alignSelf: "center",
  // },
  activityInfo: {
    flex: 5,
    paddingHorizontal: 10,
  },
  infoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityDetail: {
    fontSize: 17,
    marginBottom: 5,
  },
});
