import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  Button,
  Picker,
  themeColor,
} from "react-native-rapi-ui";
import { getCompaniesByUser, getHqByCompany } from "../../api/companiesAndHqs";

export default function HomeChooseCompanyAndHq(props) {
  const { user } = props;
  return (
    <View style={{ paddingLeft: 15, paddingVertical: 12 }}>
      <Text>{`${user.companyName}(${user.name})`}</Text>
    </View>
  );
  // const { user } = props;
  // const [companies, setCompanies] = useState([]);
  // const [headquarter, setHeadquarter] = useState([]);

  // const { companyPickerValue, setCompanyPickerValue } = useState(
  //   user.companyId
  // );
  // const { hqPickerValue, setHqPickerValue } = useState(user.headquarterId);

  // useEffect(() => {
  //   (async () => {
  //     await loadCompanies();
  //     await loadHeadquarters(user.companyId);
  //   })();
  // }, []);

  // const loadCompanies = async () => {
  //   try {
  //     const response = await getCompaniesByUser(user.userName);
  //     const companiesArray = [];
  //     for await (const company of response) {
  //       companiesArray.push({
  //         value: company.companyId,
  //         label: company.companyName,
  //       });
  //     }
  //     setCompanies(companiesArray);
  //     console.log(companies);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const loadHeadquarters = async (val) => {
  //   setCompanyPickerValue(val);
  //   try {
  //     const response = await getHqByCompany(val);
  //     const hqArray = [];
  //     for await (const hq of response) {
  //       hqArray.push({
  //         value: hq.headquarterId,
  //         label: hq.name,
  //       });
  //     }
  //     setHeadquarter(hqArray);
  //     console.log(headquarter);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // return (
  //   <View>
  //     <View>
  //       <Text>Empresa:</Text>
  //       <Picker
  //         items={companies}
  //         value={companyPickerValue}
  //         placeholder="Escoja una empresa..."
  //         onValueChange={(val) => {
  //           loadHeadquarters(val);
  //         }}
  //       />
  //     </View>
  //     <View>
  //       <Text>Sede:</Text>
  //       <Picker
  //         items={headquarter}
  //         value={hqPickerValue}
  //         onChangeItems={false}
  //         placeholder="Escoja una sede..."
  //         onValueChange={(val) => {
  //           setHqPickerValue(val);
  //         }}
  //       />
  //     </View>
  //   </View>
  // );
}
