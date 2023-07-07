import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";

import SubtitlePublishAJob from "./SubtitlePublishAJob";
import { SIZES, FONT, COLORS } from "@constants/theme";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import provincesDistricts from "@data/data.json";

const StepForm3JobForm = ({
  requirements,
  setRequirements,
  benefits,
  setBenefits,
  responsabilities,
  setResponsabilities,
  setStepForm,
  stepForm,
  province,
  setProvince,
  provinceError,
  setProvinceError,
  district,
  setDistrict,
  districtError,
  setDistrictError,
  salary,
  setSalary,
}) => {
  const [requirementToAdd, setRequirementToAdd] = useState("");
  const [benefitToAdd, setBenefitToAdd] = useState("");
  const [responsabilityToAdd, setResponsabilidadToAdd] = useState("");

  const handleAddItemRequirement = () => {
    if (requirementToAdd === "") return;
    const newRequirement = {
      id:
        requirements.reduce((maxId, obj) => {
          return obj.id > maxId ? obj.id : maxId;
        }, 0) + 1, // Assigning a unique ID to the new item
      name: requirementToAdd,
    };

    setRequirements([...requirements, newRequirement]);
    setRequirementToAdd(""); // Clearing the input text after adding an item
  };

  const handleDelteItemRequirement = (id) => {
    setRequirements([...requirements.filter((obj) => obj.id !== id)]);
  };

  //Benefits
  const handleAddItemBenefits = () => {
    if (benefitToAdd === "") {
      return;
    }
    const newBenefit = {
      id:
        benefits.reduce((maxId, obj) => {
          return obj.id > maxId ? obj.id : maxId;
        }, 0) + 1, // Assigning a unique ID to the new item
      name: benefitToAdd,
    };

    setBenefits([...benefits, newBenefit]);
    setBenefitToAdd(""); // Clearing the input text after adding an item
  };

  const handleDelteIteBenefit = (id) => {
    setBenefits([...benefits.filter((obj) => obj.id !== id)]);
  };

  //Responsabilities
  const handleAddItemResponsability = () => {
    if (responsabilityToAdd === "") {
      return;
    }
    const newResponsability = {
      id:
        responsabilities.reduce((maxId, obj) => {
          return obj.id > maxId ? obj.id : maxId;
        }, 0) + 1, // Assigning a unique ID to the new item
      name: responsabilityToAdd,
    };

    setResponsabilities([...responsabilities, newResponsability]);
    setResponsabilidadToAdd(""); // Clearing the input text after adding an item
  };

  const handleDeleteItemResponsability = (id) => {
    setResponsabilities([...responsabilities.filter((obj) => obj.id !== id)]);
  };
  //HANDLE SUBMIT REQUEST

  const handleNextPage = () => {
    const provinceError = province ? "" : "Selecciona una provincia";
    const districtError = district ? "" : "Selecciona un distrito";

    if (
      salary.value &&
      (isNaN(Number(salary.value)) || salary.value.trim() === "")
    ) {
      setSalary({ ...salary, error: "El Salario debe ser un numero" });
      if (provinceError || districtError) {
        setDistrictError(districtError);
        setProvinceError(provinceError);
      }

      return;
    } else {
      if (provinceError || districtError) {
        setDistrictError(districtError);
        setProvinceError(provinceError);
        return;
      }
    }

    setStepForm(stepForm + 1);
  };

  return (
    <ScrollView scrollEnabled={true}>
      <View style={{ flex: 1, paddingBottom: 700 }}>
        <Text
          style={{
            fontFamily: FONT.bold,
            color: COLORS.gray800,
            fontSize: SIZES.large,
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          Ubicación
        </Text>

        <View>
          <SelectList
          key={1}
            setSelected={(val) => setProvince(val)}
            data={provincesDistricts.map((e) => {
              return { key: e.id, value: e.name };
            })}
            placeholder="Provincia"
            search={false}

            onSelect={() => {
              setDistrict("");
              setProvinceError("");
            }}
            save="value"
          />
          {provinceError && (
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                color: COLORS.red600,
                fontFamily: FONT.medium,
              }}
            >
              {provinceError}
            </Text>
          )}
        </View>

        {province  && (
          <View style={{ marginTop: 10 }}>
            <SelectList
              key={2}
              setSelected={(val) => setDistrict(val)}
              onSelect={() => setDistrictError("")}
              data={provincesDistricts
                .find((obj) => obj.name === province)
                .districts.map((e) => {
                  return { key: e.id, value: e.name };
                })}
              searchPlaceholder={`Buscar un distrito de ${province}`}
              placeholder="Distrito"
              search={true}
              save="value"
              notFoundText="No se encontró ningún distrito"
            />
            {districtError && (
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: COLORS.red600,
                  fontFamily: FONT.medium,
                }}
              >
                {districtError}
              </Text>
            )}
          </View>
        )}

        <Text
          style={{
            fontFamily: FONT.bold,
            color: COLORS.gray800,
            fontSize: SIZES.large,
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          Adicional <Text style={{ fontSize: SIZES.medium }}>(Opcional)</Text>
        </Text>
        <View style={{ marginBottom: 20 }}>
          <View style={{ marginBottom: 40 }}>
            <SubtitlePublishAJob message={"Salario"} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.xLarge }}>
                S/.{" "}
              </Text>
              <TextInput
                onSubmitEditing={handleAddItemRequirement}
                placeholder="1500"
                label={"Salario"}
                keyboardType="numeric"
                mode="outlined"
                inputMode="numeric"
                value={salary.value}
                underlineColor="transparent"
                onChangeText={(number) =>
                  setSalary({ value: number, error: "" })
                }
                style={{
                  borderColor: COLORS.gray700,
                  backgroundColor: COLORS.lightWhite,
                  flex: 1,
                }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                color: COLORS.red600,
                fontFamily: FONT.medium,
              }}
            >
              {salary.error}
            </Text>
            <Text>{typeof Number("xssx")}</Text>
            <Text>{salary.value}</Text>
          </View>

          <SubtitlePublishAJob message={"Requisitos"} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={handleAddItemRequirement}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
                height: "100%",
                maxWidth: 120,
                backgroundColor: COLORS.indigo500,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Icon name="add-to-list" type="entypo" color={COLORS.white} />
              <Text style={{ fontFamily: FONT.regular, color: COLORS.white }}>
                Añadir
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TextInput
                label={"Requisito"}
                onSubmitEditing={handleAddItemRequirement}
                placeholder=""
                value={requirementToAdd}
                onChangeText={setRequirementToAdd}
                style={{
                  borderColor: COLORS.gray700,
                  backgroundColor: COLORS.lightWhite,
                }}
              />
            </View>
          </View>
          <View
            style={{
              paddingBottom: 0,
              marginTop: 20,
            }}
          >
            {requirements.length > 0 &&
              requirements.map((item) => (
                <View
                  style={{
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    backgroundColor: COLORS.gray100,
                    marginVertical: 2,
                    borderRadius: 3,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={item.id}
                >
                  <Text style={{ fontFamily: FONT.medium }}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => handleDelteItemRequirement(item.id)}
                  >
                    <Icon name="close" />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
        <View style={{ marginVertical: 50 }}>
          <SubtitlePublishAJob message={"Beneficios"} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <TouchableOpacity
              onPress={handleAddItemBenefits}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
                height: "100%",
                maxWidth: 120,
                backgroundColor: COLORS.indigo500,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Icon name="add-to-list" type="entypo" color={COLORS.white} />
              <Text style={{ fontFamily: FONT.regular, color: COLORS.white }}>
                Añadir
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TextInput
                label={"Beneficio"}
                value={benefitToAdd}
                onSubmitEditing={handleAddItemBenefits}
                onChangeText={setBenefitToAdd}
                style={{
                  borderColor: COLORS.gray700,
                  backgroundColor: COLORS.lightWhite,
                }}
              />
            </View>
          </View>
          <View
            style={{
              paddingBottom: 0,
              marginTop: 20,
            }}
          >
            {benefits.length > 0 &&
              benefits.map((item) => (
                <View
                  style={{
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    backgroundColor: COLORS.gray100,
                    marginVertical: 2,
                    borderRadius: 3,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={item.id}
                >
                  <Text style={{ fontFamily: FONT.medium }}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => handleDelteIteBenefit(item.id)}
                  >
                    <Icon name="close" />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>

        <View style={{ marginVertical: 20 }}>
          <SubtitlePublishAJob message={"Responsabilidades"} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <TouchableOpacity
              onPress={handleAddItemResponsability}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
                height: "100%",
                maxWidth: 120,
                backgroundColor: COLORS.indigo500,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Icon name="add-to-list" type="entypo" color={COLORS.white} />
              <Text style={{ fontFamily: FONT.regular, color: COLORS.white }}>
                Añadir
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TextInput
                label={"Responsabilidad"}
                value={responsabilityToAdd}
                onSubmitEditing={handleAddItemResponsability}
                onChangeText={setResponsabilidadToAdd}
                style={{
                  borderColor: COLORS.gray700,
                  backgroundColor: COLORS.lightWhite,
                }}
              />
            </View>
          </View>
          <View
            style={{
              paddingBottom: 0,
              marginTop: 20,
            }}
          >
            {responsabilities.length > 0 &&
              responsabilities.map((item) => (
                <View
                  style={{
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    backgroundColor: COLORS.gray100,
                    marginVertical: 2,
                    borderRadius: 3,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={item.id}
                >
                  <Text style={{ fontFamily: FONT.medium }}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteItemResponsability(item.id)}
                  >
                    <Icon name="close" />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            justifyContent: "space-between",
            width: "100%",
            columnGap: 10,
          }}
        >
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
            <Icon name="arrow-back" color={COLORS.white} type="ionsicon" />

            <Text style={{ color: COLORS.white }}>Atras</Text>
          </TouchableOpacity>

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
            onPress={handleNextPage}
          >
            <Text style={{ color: COLORS.white }}>Siguiente</Text>
            <Icon name="arrow-forward" color={COLORS.white} type="ionsicon" />
          </TouchableOpacity>
        </View>

        {(provinceError || districtError || salary.error) && (
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              color: COLORS.red600,
              fontFamily: FONT.medium,
            }}
          >
            Hay un campo invalido
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default StepForm3JobForm;
