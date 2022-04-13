import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import {
  Section,
  SectionContent,
  Text,
  Button,
  Picker,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCompaniesByUser, getHqByCompany } from "../api/companiesAndHqs";
import useAuth from "../hooks/useAuth";

export default function ChooseCompany() {
  const { auth, logout } = useAuth();
  const navigation = useNavigation();
  const [companies, setCompanies] = useState([]);
  const [headquarter, setHeadquarter] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      await loadCompanies();
    })();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await getCompaniesByUser(
        auth[0].userName
        // auth[0].userName && "rsantos"
        // "rsantos"
      );
      const companiesArray = [];
      for await (const company of response) {
        companiesArray.push({
          value: company.companyId,
          label: company.companyName,
        });
      }
      setCompanies(companiesArray);
      // console.log(companies);
    } catch (error) {
      console.error(error);
    }
  };

  const loadHeadquarters = async (val) => {
    formik.setFieldValue("company", val);
    try {
      const response = await getHqByCompany(val);
      const hqArray = [];
      for await (const hq of response) {
        hqArray.push({
          value: hq.headquarterId,
          label: hq.name,
        });
      }
      formik.setFieldValue("hq", "");
      // console.log(response[0].headquarterId);
      setHeadquarter(hqArray);
      // console.log(headquarter);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const { company, hq } = formValue;
      setError("");
      auth[0].companyId = company;
      auth[0].headquarterId = hq;
      // console.log(auth[0]);
      if (auth[0].companyId !== "" && auth[0].headquarterId !== "") {
        navigation.navigate("HomeNavigation", {
          companyName: auth[0].companyName,
          hqName: auth[0].name,
        });
      }
    },
  });

  return (
    <View style={styles.alignment}>
      <Section style={styles.container}>
        <SectionContent>
          <View>
            <Text style={styles.title}>Seleccione una empresa:</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              items={companies}
              value={formik.values.company}
              placeholder="Escoja una empresa..."
              onValueChange={(val) => {
                loadHeadquarters(val);
              }}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              items={headquarter}
              value={formik.values.hq}
              onChangeItems={false}
              placeholder="Escoja una sede..."
              onValueChange={(val) => {
                formik.setFieldValue("hq", val);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View>
              <Button
                text="Volver"
                onPress={logout}
                leftContent={
                  <Ionicons
                    name="arrow-back-circle"
                    size={20}
                    color={themeColor.white}
                  />
                }
                color={themeColor.gray300}
              />
            </View>
            <View>
              <Button
                text="Entrar"
                color={themeColor.success600}
                rightContent={
                  <Ionicons name="log-in" size={20} color={themeColor.white} />
                }
                onPress={formik.handleSubmit}
              />
            </View>
          </View>
        </SectionContent>
      </Section>
      <Text style={styles.error}>{formik.errors.company}</Text>
      <Text style={styles.error}>{formik.errors.hq}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function initialValues() {
  return {
    hq: "",
    company: "",
  };
}

function validationSchema() {
  return {
    company: Yup.string().required("La empresa es obligatoria"),
    hq: Yup.string().required("La sede es obligatoria"),
  };
}

const styles = StyleSheet.create({
  alignment: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    marginHorizontal: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  pickerContainer: {
    marginVertical: 7,
  },
  buttonContainer: {
    marginVertical: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 10,
  },
});
