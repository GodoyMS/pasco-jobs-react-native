import { View, Text } from "react-native";

import TextInput from "@components/login/TextInput";

import React, { useState } from "react";

import { COLORS, FONT, SIZES } from "@constants/theme";
import { RadioButton } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import provincesDistricts from "@data/data.json";

const Step2Form = ({
  position,
  setPosition,
  description,
  setDescription,
  age,
  setAge,
  district,
  setDistrict,
  provinceError,
  districtError,
  setDistrictError,
  setProvinceError,
  province,
  setProvince,
  sex,
  setSex,
}) => {
  // const [selectedObject, setSelectedObject] = useState(null);
  // const [selectedDistrict, setSelectedDistrict] = useState(null);
  // const [valueProvince, setValueProvince] = useState(null);
  // const [valueDistrict, setValueDistric] = useState(null);



  // const handleObjectChange = (value) => {
  //   const selected = provinces.find((obj) => obj.name === value);
  //   setValueProvince(value);
  //   setProvince(value);
  //   setSelectedObject(selected);
  // };

  // const handleChangeDistrict = (value) => {
  //   setValueDistric(value);
  //   setDistrict(value);
  // };

  // const handleProvinceChange = (value) => {
  //   setSelectedProvince(value);
  // };
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          maxWidth: 400,
          justifyContent: "center",
          padding: 20,
          alignSelf: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontFamily: FONT.medium,
            fontSize: SIZES.large,
            fontWeight: "bold",
            color: COLORS.gray800,
            width: "100%",
          }}
        >
          Ubicación
        </Text>

        <View style={{ width: "100%", marginTop: 10 }}>
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

        {province && (
          <View style={{ marginTop: 10, width: "100%" }}>
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
      </View>

      {/* <View
        style={{
          paddingBottom: 20,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          zIndex: 900,
          justifyContent: "center",
          columnGap: 20,
        }}
      >
        <DropDownPicker
          placeholder="Provincia"
          open={openProvince}
          containerStyle={{ zIndex: 200, width: 180 }}
          style={{ backgroundColor: "transparent" }}
          value={valueProvince}
          setValue={handleObjectChange}
          onChangeValue={handleObjectChange}
          key={1}
          theme="LIGHT"
          multiple={false}
          mode="BADGE"
          setOpen={setOpenProvince}
          items={provinces.map((obj) => ({
            label: obj.name,
            value: obj.name,
          }))}
        />
        {selectedObject && (
          <DropDownPicker
            placeholder="Distrito"
            open={openDistrict}
            style={{ backgroundColor: "transparent" }}
            containerStyle={{ zIndex: 200, width: 180 }}
            mode="BADGE"
            setOpen={setOpenDistrict}
            value={valueDistrict}
            setValue={setValueDistric}
            onChangeValue={handleChangeDistrict}
            items={selectedObject.districts.map((district) => ({
              label: district.name,
              value: district.name,
            }))}
          />
        )}
      </View> */}
      <TextInput
        label="Puesto"
        returnKeyType="next"
        placeholder="Ej. Odontólogo"
        value={position.value}
        onChangeText={(text) => setPosition({ value: text, error: "" })}
        error={!!position.error}
        errorText={position.error}
        autoCapitalize="none"
        textContentType="jobTitle"
        keyboardType="default"
      />
      <TextInput
        label="Descripcion breve"
        multiline={true}
        numberOfLines={4}
        placeholderTextColor={COLORS.gray600}
        returnKeyType="next"
        placeholder="Realiza una descripción breve de ti, sientete libre de expresar tus talentos ..."
        value={description.value}
        onChangeText={(text) => setDescription({ value: text, error: "" })}
        error={!!description.error}
        errorText={description.error}
        autoCapitalize="none"
        keyboardType="default"
      />
      <TextInput
        keyboardType="numeric"
        label="Edad"
        returnKeyType="next"
        placeholder=""
        value={age.value}
        onChangeText={(text) => setAge({ value: text, error: "" })}
        error={!!age.error}
        errorText={age.error}
        autoCapitalize="none"
      />
      <View
        style={{ justifyContent: "flex-start", width: "100%", marginTop: 50 }}
      >
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: SIZES.medium,
            paddingLeft: 15,
          }}
        >
          Sexo:
        </Text>
        <View>
          <RadioButton.Group
            onValueChange={(value) => setSex({ value, error: "" })}
            value={sex.value}
          >
            <RadioButton.Item
              style={{ width: "50%" }}
              color={COLORS.indigo800}
              labelStyle={{ fontFamily: FONT.medium, color: COLORS.indigo800 }}
              position="leading"
              label="Hombre"
              value="Hombre"
            />
            <RadioButton.Item
              style={{ width: "50%" }}
              color={COLORS.indigo800}
              labelStyle={{ fontFamily: FONT.medium, color: COLORS.indigo800 }}
              position="leading"
              label="Mujer"
              value="Mujer"
            />
          </RadioButton.Group>
        </View>
      </View>
    </>
  );
};

export default Step2Form;
