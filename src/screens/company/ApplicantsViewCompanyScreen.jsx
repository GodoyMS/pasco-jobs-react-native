import React,{useEffect} from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";

import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import {  useState } from "react";
import { FONT, SIZES } from "@constants/theme";

import { SelectList } from 'react-native-dropdown-select-list'

const handleHead2 = ({tintColor}) => <Text style={{color: tintColor,fontSize:SIZES.large,fontFamily:FONT.medium}}>H1</Text>

const ApplicantsViewCompanyScreen = () => {
  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]



  const { width } = useWindowDimensions();
  const[html,setHtml]=useState("")
  const richText = React.useRef();

  const source = {
    html: html
  };
	return (
    <SafeAreaView>
      <ScrollView style={{marginTop:100}}>

      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        placeholder="Buscar s"
        search={false}
        searchPlaceholder="Buscar"
    />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
          <Text>Description:</Text>
          <RichToolbar
        editor={richText}
        actions={[actions.heading2, actions.setBold, actions.setItalic, actions.setUnderline,actions.insertBulletsList,actions.indent,actions.outdent]}
        iconMap={{ [actions.heading2]: handleHead2 }}
      />
          <RichEditor
              ref={richText}
              onChange={ descriptionText => setHtml(descriptionText)}
          />
        </KeyboardAvoidingView>

        <Text>{html}</Text>
      </ScrollView>

   

<RenderHtml
      contentWidth={width}
      source={source}
    />
    </SafeAreaView>
  );
}

export default ApplicantsViewCompanyScreen

