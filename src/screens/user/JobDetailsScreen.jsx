import { Text, StyleSheet, View } from "react-native";
import React, { Component,useState } from "react";
import { SafeAreaView,ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { addFavoriteJob } from "@features/user/userSlice";
import stylesSmallSpecifics from "@components/user/jobdetails/smallSpecifics/smallSpecifics.style";
import Company from "@components/user/jobdetails/company/Company";
import Tabs from "@components/user/jobdetails/tabs/Tabs";
import About from "@components/user/jobdetails/about/About";
import Specifics from "@components/user/jobdetails/specifics/Specifics";
import Footer from "@components/user/jobdetails/footer/Footer";
import { COLORS,FONT,SIZES } from "@constants/theme";
import { useDispatch } from "react-redux";
import { backendURL } from "@config/config";
import icons from "@constants/icons";
export const JobDetailsUserScreen = (props) => {
  const tabs = ["Descripción", "Requisitos", "Responsabilidades"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const favJobsRedux = useSelector((state) => state.user.favUserJobs);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const userId=useSelector((state)=>state.user.infoUser.id)
  const [showMessage,setShowMessage]=useState(false);

  const {
    navigation,
    route: { params },
  } = props;
  const [data, setData] = useState();

  const dispatch=useDispatch();


  useEffect(() => {
    if (favJobsRedux.includes(params.itemId)) {
      setIsAddedToFav(true);
    } else {
      setIsAddedToFav(false);
    }
  }, [favJobsRedux,params]);

  const handleAddFavoriteJob = async () => {
    await axios
      .post(
        `${backendURL}api/favoriteJobs`,
        { user: userId, job: params.itemId },
        { withCredentials: "include" }
      )
      .then(({ data }) => dispatch(addFavoriteJob(data.doc)))

      .then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 1000);
      })
      .catch((e) => console.log(e));
  };



  

  
  const fetchData = () => {
    axios
      .get(`${backendURL}api/jobs/${params.itemId}`)
      .then(({ data }) => setData(data))
      .then((e) => console.log(e))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [params.itemId]);




  const displayTabContent = () => {
    switch (activeTab) {
      case "Descripción":
        if (data) {
          return (
            <About Title="Requisitos" info={data.description ?? ["N/A"]} />
          );
        }

      case "Requisitos":
        if (data) {
          return (
            <Specifics
              title="Requisitos"
              points={data.requirements ?? ["N/A"]}
            />
          );
        }

      case "Responsabilidades":
        if (data) {
          return (
            <Specifics
              title="Responsabilidades"
              points={data?.responsabilities ?? ["N/A"]}
            />
          );
        }

      default:
        return null;
    }
  };
  
    if (data) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
       

        <>
          <ScrollView  showsVerticalScrollIndicator={true}>
            {!data ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <>
                <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                  <Company
                    companyLogo={data.author.profile.url}
                    jobTitle={data.title}
                    companyName={data.author.name}
                    location={data.provincia}
                  />

                  <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  {displayTabContent()}
                  <View style={stylesSmallSpecifics.containerTwoCardJob}>

                  <View style={{marginHorizontal:10,flex:1,flexDirection:"row",columnGap:15}}>
                    <View style={{backgroundColor:COLORS.gray50,flexDirection:"column",rowGap:5,justifyContent:"center",width:120,paddingVertical:15,paddingHorizontal:5,borderRadius:15}}>
                      <Image style={{width:20,height:20,marginHorizontal:"auto"}} source={icons.locationMap}/>
                      <Text style={{textAlign:"center",fontFamily:FONT.regular,fontSize:10,color:COLORS.gray500}}>Ubicación</Text>
                      <Text style={{textAlign:"center",fontFamily:FONT.bold,fontSize:13,color:COLORS.gray700}}> {data.provincia}</Text>              

                    </View>
                    <View style={{flex:1,flexDirection:"column",rowGap:10}}>
                      <View style={{flexDirection:"column",backgroundColor:COLORS.gray50,paddingHorizontal:10,paddingVertical:15,borderRadius:15}}>    
                        <Text style={{textAlign:"left",fontFamily:FONT.regular,fontSize:10,color:COLORS.gray500}}>Experiencia</Text>
                        <Text style={{textAlign:"left",fontFamily:FONT.bold,fontSize:13,color:COLORS.gray700}}> {data.workExperience.name}</Text>   
                      </View> 

                      <View style={{flex:1,flexDirection:"row",width:"100%",columnGap:15}}>
                        <View style={{flexDirection:"column",flex:1,backgroundColor:COLORS.gray50,paddingHorizontal:10,paddingVertical:15,borderRadius:15}}>
                          
                          <Text style={{textAlign:"left",fontFamily:FONT.regular,fontSize:10,color:COLORS.gray500}}>Horario</Text>
                          <Text style={{textAlign:"left",fontFamily:FONT.bold,fontSize:13,color:COLORS.gray700}}> {data.workShift.name}</Text> 

                        </View>
                        <View style={{flexDirection:"column",flex:1,backgroundColor:COLORS.gray50,paddingHorizontal:10,paddingVertical:15,borderRadius:15}}>
                          <Text style={{textAlign:"left",fontFamily:FONT.regular,fontSize:10,color:COLORS.gray500}}>Salario</Text>
                          <Text style={{textAlign:"left",fontFamily:FONT.bold,fontSize:13,color:COLORS.gray700}}> { data.salary ? `S/. ${data.salary}` :"Sin especificar"}</Text> 

                        </View>
                      </View>

                    </View>

                  </View>
                  {/* <FlatList
                    data={[
                      { id: 0, name: data.contract.name, icon: 21 },
                      { id: 1, name: data.workExperience.name, icon: 21 },
                      { id: 2, name: data.workShift.name, icon: 21 },
                      { id: 3, name: "S/. " + data.salary, icon: 123 },
                    ]}
                    horizontal
                    keyExtractor={(item) => String(item.id)}
                    showsHorizontalScrollIndicator={true}
                    renderItem={({ item }) => (
                      <Text style={stylesSmallSpecifics.containerTwoCardJobText} >
                        {item.name}
                      </Text>
                    )}
                    contentContainerStyle={{ columnGap: SIZES.small / 2 }}
                  /> */}
                </View>
                </View>

               
              </>
            )}
          </ScrollView>

          <Footer handleAddFavorite={handleAddFavoriteJob} isAddedToFav={isAddedToFav} showMessage={showMessage} />
        </>
      </SafeAreaView>
    );
  }
  return null;
};

const styles = StyleSheet.create({});

export default JobDetailsUserScreen;
