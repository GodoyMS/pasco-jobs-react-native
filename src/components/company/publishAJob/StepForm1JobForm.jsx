import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextInput from "@components/login/TextInput";
import { COLORS, FONT, SIZES } from "@constants/theme";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { backendURL } from "@config/config";    
import SubtitlePublishAJob from "./SubtitlePublishAJob";
import { SelectList } from "react-native-dropdown-select-list";

const StepForm1JobForm = ({
  title,
  setTitle,
  setSelectedCategory,
  setSelectedContract,
  setSelectedWorkExperiences,
  setSelectedWorkShifts,
  errorSelectedCategory,
  errorSelectedContract,
  errorSelectedWorkShifts,
  errorSelectedWorkExperiences,
  setErrorSelectedCategory,
  setErrorSelecteWorkExperiences,
  setErrorSelectedContract,
  setErrorSelectedWorkShifts
  
}) => {
  const [categories, setCategories] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [workShifts, setWorkShifts] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);

  useEffect(() => {
    axios.get(`${backendURL}api/categories`).then(({ data }) =>
      setCategories(
        data.docs.map((e) => {
          return { key: e.id, value: e.name };
        })
      )
    );

    axios.get(`${backendURL}api/contracts`).then(({ data }) =>
      setContracts(
        data.docs.map((e) => {
          return { key: e.id, value: e.name };
        })
      )
    );

    axios.get(`${backendURL}api/workShifts`).then(({ data }) =>
      setWorkShifts(
        data.docs.map((e) => {
          return { key: e.id, value: e.name };
        })
      )
    );

    axios.get(`${backendURL}api/workExperience`).then(({ data }) =>
      setWorkExperiences(
        data.docs.map((e) => {
          return { key: e.id, value: e.name };
        })
      )
    );
  }, []);

  return (
    <>
      <View>
        <Text
          style={{
            fontFamily: FONT.bold,
            color: COLORS.gray800,
            fontSize: SIZES.large,
            marginBottom: 0,
          }}
        >
          General
        </Text>
      </View>
      <TextInput
        label="Título"
        returnKeyType="next"
        value={title.value}
        onChangeText={(text) => setTitle({ value: text, error: "" })}
        error={!!title.error}
        errorText={title.error}
        autoCapitalize="none"
        autoCompleteType="job"
        placeholder="Escribe un  título breve y conciso"
      />

      {/**CATEGORY */}

     

      {categories && categories.length > 0 && (
        
        <View scrollEnabled={false} style={{ marginVertical: 10 }}>
          <SelectList
            setSelected={(val) => setSelectedCategory(val)}
            data={categories}
            placeholder="Categoría"
            search={true}
            save="key"
            onSelect={()=>setErrorSelectedCategory("")}
            searchPlaceholder="Buscar"
          />
          {errorSelectedCategory && (
            <Text style={{ color: COLORS.red600 }}>Selecciona una categoría</Text>
          )}
        </View>
      )}

      {contracts && contracts.length > 0 && (
        <View scrollEnabled={false} style={{ marginVertical: 10 }}>

          <SelectList
            setSelected={(val) => setSelectedContract(val)}
            data={contracts}
            placeholder="Tipo de contrato"
            search={false}
            save="key"
            onSelect={()=>setErrorSelectedContract("")}

            searchPlaceholder="Buscar"
          />
          {errorSelectedContract && (
            <Text style={{ color: COLORS.red600 }}>Selecciona una tipo de contrato</Text>
          )}
        </View>
      )}

      {workShifts && workShifts.length > 0 && (
        <View scrollEnabled={false} style={{ marginVertical: 10 }}>

          <SelectList
            setSelected={(val) => setSelectedWorkShifts(val)}
            data={workShifts}
            placeholder="Tipo de jornada"
            search={false}
            save="key"
            onSelect={()=>setErrorSelectedWorkShifts("")}
            searchPlaceholder="Buscar"
          />
          {errorSelectedWorkShifts && (
            <Text style={{ color: COLORS.red600 }}>
              Selecciona un tipo de experiencia laboral
            </Text>
          )}
        </View>
      )}

      {workExperiences && workExperiences.length > 0 && (
        <View scrollEnabled={false} style={{ marginVertical: 10 }}>

          <SelectList
            setSelected={(val) => setSelectedWorkExperiences(val)}
            data={workExperiences}
            placeholder="Experiencia laboral requerida"
            onSelect={()=>setErrorSelecteWorkExperiences("")}

            search={false}
            save="key"
          />
          {errorSelectedWorkExperiences && (
            <Text style={{ color: COLORS.red600 }}>
              Selecciona un tipo de jornada
            </Text>
          )}
        </View>
      )}
    </>
  );
};

export default StepForm1JobForm;

const styles = StyleSheet.create({});
