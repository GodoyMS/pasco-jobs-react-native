import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, {  useState } from "react";

import { COLORS, SIZES, FONT } from "@constants/theme";



import { Button, Dialog, PaperProvider, Portal, Provider } from "react-native-paper";
import PdfRender from "@components/company/publishedJobs/PdfRender";
import FinalistApplications from "./jobApplicants/FinalistApplications";
import AllApplicationsSingleJob from "./jobApplicants/AllApplicationsSingleJob";
import { Tab } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";

const JobApplicantsCompanyScreen = (props) => {
  const hideDialog = () => setVisible(false);
  const {
    navigation,
    route: { params },
  } = props;

  
 

  const [visible, setVisible] = React.useState(false);
  const [currentPDFURL, setCurrentPDFURL] = useState("");
  
  const [tab, setTab] = useState("all");
  const [index, setIndex] = useState(0);








  const openPDF = (pdfurl) => {
    setVisible(true);
    setCurrentPDFURL(pdfurl);
  };
  console.log(index)

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <StatusBar/>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content
              style={{ paddingHorizontal: 5, paddingVertical: 0 }}
            >
              <PdfRender url={currentPDFURL} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode="outlined"
                style={{ paddingHorizontal: 10 }}
                onPress={hideDialog}
              >
                Cerrar
              </Button>
            
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <View style={{ marginTop: 80, marginHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: FONT.bold,
              color: COLORS.gray800,
              fontSize: SIZES.xLarge,
              marginBottom: 10,
            }}
          >
            Postulantes
          </Text>
          {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                columnGap: 10,
                marginBottom: 5,
              }}
            >
              <TouchableOpacity
                onPress={() =>{ setTab("all")}}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  backgroundColor:
                    tab === "all" ? COLORS.white : COLORS.primary,
                  borderBottomColor:
                    tab === "all" ? COLORS.tertiary : COLORS.primary,
                  borderBottomWidth: tab === "all" ? 1 : 0,
                }}
              >
                <Icon
                  color={tab === "all" ? COLORS.black : COLORS.gray700}
                  name="list"
                  type="feather"
                />
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    color: tab === "all" ? COLORS.black : COLORS.gray700,
                  }}
                >
                  Todos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setTab("finalists")}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  backgroundColor:
                    tab === "finalists" ? COLORS.white : COLORS.primary,
                  borderBottomColor:
                    tab === "finalists" ? COLORS.tertiary : COLORS.primary,
                  borderBottomWidth: tab === "finalists" ? 1 : 0,
                }}
              >
                <Icon
                  color={tab === "finalists" ? COLORS.black : COLORS.gray700}
                  name="users"
                  type="font-awesome-5"
                />
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    color: tab === "finalists" ? COLORS.black : COLORS.gray700,
                  }}
                >
                  Finalistas
                </Text>
              </TouchableOpacity>
            </View> */}
            
           <View>
             <Tab
              style={{ marginTop: 10}}
              value={index}
              onChange={(e) => setIndex(e)}
              iconPosition="left"
              
              indicatorStyle={{
                backgroundColor: COLORS.tertiary,
                height: 3,
              }}
            >
              <Tab.Item
              style={{paddingHorizontal:20 }}
                title="Todos"
                titleStyle={(active) => {
                  return {
                    fontSize: 12,
                    color: active ? COLORS.tertiary : COLORS.gray700,
                    fontFamily: FONT.medium,
                  };
                }}
                icon={(active) => {
                  return {
                    name: active ? "th-list": "list",
                    type: "font-awesome-5",
                    color: active ? COLORS.tertiary : COLORS.gray700,
                    size: 20,
                  };
                }}
              />
              <Tab.Item
                title="Finalistas"
                titleStyle={(active) => {
                  return {
                    fontSize: 12,
                    color: active ? COLORS.tertiary : COLORS.gray700,
                    fontFamily: FONT.medium,
                  };
                }}
                icon={(active) => {
                  return {
                    name: active ? "users" :"users",
                    type: "font-awesome",
                    color: active ? COLORS.tertiary : COLORS.gray700,
                    size: 20,
                  };
                }}
              />
             
            </Tab>
           </View>

            


          {index === 0 && (
            <>
                        <AllApplicationsSingleJob jobId={params?.itemId}  openPDF={openPDF}/>

            </>
          )}
          {index === 1 && (
            <>
                        <FinalistApplications jobId={params?.itemId}  openPDF={openPDF}/>

            </>
          )}
          
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default JobApplicantsCompanyScreen;

const styles = StyleSheet.create({});
