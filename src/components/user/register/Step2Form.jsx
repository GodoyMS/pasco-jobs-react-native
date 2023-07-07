import { View, Text, Picker } from "react-native";
import {
  Button,
  Menu,
  Divider,
  Provider,
  PaperProvider,
  Select,
  List,
} from "react-native-paper";
import TextInput from "@components/login/TextInput";

import React, { useState } from "react";
import provinces from "@data/data.json";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { RadioButton } from 'react-native-paper';

const Step2Form = ({
  position,
  setPosition,
  description,
  setDescription,
  age,
  setAge,
  district,
  setDistrict,
  province,
  setProvince,
  sex,
  setSex,
}) => {

  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [valueProvince, setValueProvince] = useState(null);
  const [valueDistrict, setValueDistric] = useState(null);

  const [openProvince, setOpenProvince] = useState(null);
  const [openDistrict, setOpenDistrict] = useState(null);

  const handleObjectChange = (value) => {
    const selected = provinces.find((obj) => obj.name === value);
    setValueProvince(value);
    setProvince(value)
    setSelectedObject(selected);
  };

  const handleChangeDistrict = (value) => {
    setValueDistric(value);
    setDistrict(value)
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
  };
  return (
    <>
      <View
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
          style={{backgroundColor:"transparent" }}
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
            style={{backgroundColor:"transparent" }}
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
      </View>
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
     
    <View style={{justifyContent:"flex-start",width:"100%",marginTop:50}}>
        <Text style={{fontFamily:FONT.medium,fontSize:SIZES.medium,paddingLeft:15}}>Sexo:</Text>
        <View>
        <RadioButton.Group  onValueChange={value => setSex({value,error:""})} value={sex.value} >
        <RadioButton.Item style={{width:"50%"}}   labelStyle={{fontFamily:FONT.medium}}   position="leading"  label="Hombre" value="Hombre" />
        <RadioButton.Item style={{width:"50%"}}  labelStyle={{fontFamily:FONT.medium}}  position="leading" label="Mujer" value="Mujer" />
        </RadioButton.Group>
        </View>     
    </View>


  
    
    </>
  );
};

export default Step2Form;
