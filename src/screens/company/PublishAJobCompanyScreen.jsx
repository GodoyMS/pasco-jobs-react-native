import React, { useEffect } from "react";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { StyleSheet, View } from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { useState } from "react";
import { COLORS, FONT, SIZES } from "@constants/theme";
import TextInput from "@components/login/TextInput";

import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { backendURL } from "@config/config";
import SubtitlePublishAJob from "@components/company/publishAJob/SubtitlePublishAJob";
import StepHeaderJobForm from "@components/company/publishAJob/StepHeaderJobForm";
import StepForm1JobForm from "@components/company/publishAJob/StepForm1JobForm";
import StepForm3JobForm from "@components/company/publishAJob/StepForm3JobForm";
import StepForm2JobForm from "@components/company/publishAJob/StepForm2JobForm";
import { Icon } from "@rneui/themed";
import { jobTitleValidaotr } from "@helpers/company/jobTitleValidator";
import { jobSelectOptionValidator } from "@helpers/company/jobSelectOptionValidator";
import { useSelector } from "react-redux";
import FormLoader from "@components/loaders/FormLoader";
const PublishAJobCompanyScreen = () => {
  const infoCompany = useSelector((state) => state.company.infoCompany);

  const [stepForm, setStepForm] = useState(1);

  const [selected, setSelected] = React.useState("");
  const [title, setTitle] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({ value: "", error: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errorSelectedCategory, setErrorSelectedCategory] = useState("");

  const [selectedContract, setSelectedContract] = useState("");
  const [errorSelectedContract, setErrorSelectedContract] = useState("");

  const [selectedWorkShifts, setSelectedWorkShifts] = useState("");
  const [errorSelectedWorkShifts, setErrorSelectedWorkShifts] = useState("");

  const [selectedWorkExperiences, setSelectedWorkExperiences] = useState("");
  const [errorSelectedWorkExperiences, setErrorSelecteWorkExperiences] =
    useState("");
  const [requirements, setRequirements] = useState([]);
  const [responsabilities, setResponsabilities] = useState([]);
  const [benefits, setBenefits] = useState([]);

  const [province, setProvince] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [salary, setSalary] = useState({ value: "", error: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);

  const resetAllValues=()=>{
    setTitle({ value: "", error: "" });
    setDescription({ value: "", error: "" });
    setSelectedCategory("");
    setSelectedContract("");
    setSelectedWorkShifts("");
    setSelectedWorkExperiences("");
    setRequirements([]);
    setResponsabilities([]);
    setBenefits([]);
    //location values
    setProvince("");
    setDistrict("");
    setSalary({ value: "", error: "" });
    setIsSucces(false);
    setStepForm(1);
    
  }

  console.log(responsabilities.map((e) => {
    return { item: e.name };
  }));

  const { width } = useWindowDimensions();

  const handleNextStep = () => {
    if (stepForm === 1) {
      const titleError = title.value ? "" : "No puede estar vacío";
      const categoryError = selectedCategory ? "" : "Selecciona una opción";
      const contractError = selectedContract ? "" : "Selecciona una opción";
      const workShiftError = selectedWorkShifts ? "" : "Selecciona una opción";
      const workExperienceError = selectedWorkExperiences
        ? ""
        : "Selecciona una opción";

      if (
        titleError ||
        categoryError ||
        contractError ||
        workShiftError ||
        workExperienceError
      ) {
        setTitle({ ...title, error: titleError });
        setErrorSelectedCategory(categoryError);
        setErrorSelectedContract(contractError);
        setErrorSelecteWorkExperiences(workExperienceError);
        setErrorSelectedWorkShifts(workShiftError);

        return;
      }
      setStepForm(2);
    }

    if (stepForm === 2) {
      const descriptionError = description.value
        ? ""
        : "Escribe una descripción";

      if (descriptionError) {
        setDescription({ ...description, error: descriptionError });
        return;
      }
      setStepForm(3);
    }
  };

  const handleSubmitJob = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${backendURL}api/jobs`,
        {
          title: title.value,
          author: infoCompany.id,
          category: selectedCategory,
          workShift: selectedWorkShifts,
          contract: selectedContract,
          workExperience: selectedWorkExperiences,
          description: description.value,
          salary:
            salary.value !== "" && !isNaN(Number(salary.value))
              ? Number(salary.value)
              : null,
          responsabilities: responsabilities.map((e) => {
            return { item: e.name };
          }),
          requirements: requirements.map((e) => {
            return { item: e.name };
          }),
          benefits: benefits.map((e) => {
            return { item: e.name };
          }),
          province: province.toString(),
          district: district.toString(),
        },
        { withCredentials: "include" }
      )
      .then(({ data }) => console.log(data))
      .then(() => setIsSucces(true))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <FormLoader message={"Actualizando"} isLoading={isLoading} />
      <View style={{ marginTop: 30 }}>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: FONT.bold,
                color: COLORS.gray800,
                fontSize: SIZES.xLarge,
                marginBottom: 10,
              }}
            >
              Publicar una oferta laboral
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",

              justifyContent: "center",
              padding: 5,
              alignSelf: "center",
              alignItems: "center",
              alignContent: "center",
              width: "100%",
              marginTop: 0,
              columnGap: 15,
            }}
          >
            <StepHeaderJobForm
              title={"General"}
              currentStep={1}
              subTitle={"Paso 1"}
              stepForm={stepForm}
            />
            <StepHeaderJobForm
              title={"Descripción"}
              currentStep={2}
              subTitle={"Paso 2"}
              stepForm={stepForm}
            />
            <StepHeaderJobForm
              title={"Detalles"}
              currentStep={3}
              subTitle={"Paso 3 "}
              stepForm={stepForm}
            />
          </View>

          {stepForm === 1 && (
            <StepForm1JobForm
              title={title}
              setTitle={setTitle}
              setSelectedCategory={setSelectedCategory}
              setSelectedContract={setSelectedContract}
              setSelectedWorkExperiences={setSelectedWorkExperiences}
              setSelectedWorkShifts={setSelectedWorkShifts}
              errorSelectedCategory={errorSelectedCategory}
              errorSelectedContract={errorSelectedContract}
              errorSelectedWorkShifts={errorSelectedWorkShifts}
              errorSelectedWorkExperiences={errorSelectedWorkExperiences}
              setErrorSelectedCategory={setErrorSelectedCategory}
              setErrorSelecteWorkExperiences={setErrorSelecteWorkExperiences}
              setErrorSelectedContract={setErrorSelectedContract}
              setErrorSelectedWorkShifts={setErrorSelectedWorkShifts}
            />
          )}

          {stepForm === 2 && (
            <StepForm2JobForm
              description={description}
              setDescription={setDescription}
            />
          )}
          {infoCompany && stepForm === 3 && (
            <StepForm3JobForm
              stepForm={stepForm}
              setStepForm={setStepForm}
              requirements={requirements}
              setRequirements={setRequirements}
              responsabilities={responsabilities}
              setResponsabilities={setResponsabilities}
              benefits={benefits}
              setBenefits={setBenefits}
              province={province}
              setProvince={setProvince}
              provinceError={provinceError}
              setProvinceError={setProvinceError}
              district={district}
              setDistrict={setDistrict}
              districtError={districtError}
              setDistrictError={setDistrictError}
              salary={salary}
              setSalary={setSalary}
            />
          )}
          {infoCompany && stepForm === 4 && (
            <View style={{ marginTop: 50 }}>
              {!isSuccess && (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    columnGap: 10,
                    backgroundColor: COLORS.gray700,
                    maxWidth: 200,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  underlayColor={COLORS.gray800}
                  activeOpacity={0.9}
                  onPress={() => setStepForm(stepForm - 1)}
                >
                  <Icon
                    name="arrow-back"
                    color={COLORS.white}
                    type="ionsicon"
                  />
                  <Text style={{ color: COLORS.white }}>Atras</Text>
                </TouchableOpacity>
              )}

              {isSuccess && (
                <>
                  <Text
                    style={{
                      fontFamily: FONT.medium,
                      paddingHorizontal: 20,
                      color: COLORS.indigo600,
                      fontSize: SIZES.small,
                    }}
                  >
                    Ahora tu oferta de empleo es público y llegara a miles de
                    aspirantes.
                  </Text>
                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      fontFamily: FONT.bold,
                      paddingHorizontal: 20,
                      color: COLORS.indigo600,
                      marginTop: 10,
                      textAlign: "center",
                    }}
                  >
                    ¡Gracias por confiar en Pasco Jobs!
                  </Text>
                </>
              )}

              <Button
                mode="contained"
                onPress={isSuccess ? () => void null : handleSubmitJob}
                style={{
                  marginTop: isSuccess ? 20 : 60,
                  
                  paddingVertical:7,
                  fontFamily: FONT.medium,
                  
                  backgroundColor: isSuccess
                    ? COLORS.green500
                    : COLORS.tertiary,
                }}
              >
               <Text style={{fontSize:SIZES.medium}}>{isSuccess ? "Publicado exitosamente" : "Publicar"}</Text> 
              </Button>

              {isSuccess && (
                <Button
                  mode="contained"
                  onPress={resetAllValues}
                  
                  style={{
                    marginTop: 60,
                    fontFamily: FONT.medium,
                    backgroundColor:COLORS.indigo700
                  }}
                >
                 Publicar otra oferta de empleo
                </Button>
              )}
            </View>
          )}

          {/**Buttons */}

          {stepForm <= 3 && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 50,
                justifyContent: "space-between",
                width: "100%",
                columnGap: 10,
              }}
            >
              {stepForm > 1 && stepForm <= 3 && (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    columnGap: 10,
                    backgroundColor: COLORS.gray700,
                    flex: 1,
                    maxWidth: 200,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  underlayColor={COLORS.gray800}
                  activeOpacity={0.9}
                  onPress={() => setStepForm(stepForm - 1)}
                >
                  <Icon
                    name="arrow-back"
                    color={COLORS.white}
                    type="ionsicon"
                  />

                  <Text style={{ color: COLORS.white }}>Atras</Text>
                </TouchableOpacity>
              )}

              {stepForm >= 1 && stepForm <= 2 && (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    maxWidth: 200,
                    columnGap: 10,
                    backgroundColor: COLORS.gray700,
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={handleNextStep}
                  underlayColor={COLORS.gray800}
                  activeOpacity={0.9}
                >
                  <Text style={{ color: COLORS.white }}>Siguiente</Text>
                  <Icon
                    name="arrow-forward"
                    color={COLORS.white}
                    type="ionsicon"
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PublishAJobCompanyScreen;

const styles = StyleSheet.create({});
