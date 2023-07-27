import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import PostCardAccount from "@components/cards/PostCardAccount";
import post1 from "@assets/images/information/apply.png";
import post2 from "@assets/images/information/report_ps.png";
import post4 from "@assets/images/information/privacy.png";

import post3 from "@assets/images/company/defaultprofilecompany-min.png"
import post5 from "@assets/images/information/goal.png"
import { COLORS, FONT, SIZES } from "@constants/theme";
import { StatusBar } from "expo-status-bar";
const InformationCompanyScreen = () => {
    const posts = [
        {
          title: '¿Cómo puedo iniciar un proceso de selección?',
          content: '1. Inicia sesión en tu cuenta de Pasco Jobs o crea una nueva si aún no tienes una.\n2. Crea un oferta de trabajo atractiva, es bueno que detalles lo mas posible para obtener candidatos ideales al puesto.\n3.En la sección de empleos aparecera tus trabajos publicados y podrás seleccionar a los mejores candidatos al puesto, podrás ver sus curriculum vitae y demas información importante de los candidatos en la misma aplicación  \n4.Una vez haya culminado tu proceso de selección, modifica el boton de activo a finalizado en el trabajo publicado. ',
          backgroundImage: post1,
        },
        {
          title: '¿Cómo puedo reportar un problema en Pasco Jobs?',
          content: '1. Dirígete a la sección de "Reportar un problema" dentro de la aplicación Pasco Jobs.\n2. Describe detalladamente el problema que estás experimentando, incluyendo cualquier mensaje de error o comportamiento inesperado.(Esto ayudará enormemente a mejorar la aplicación) \n3. Envía tu reporte y mantente atento a las respuestas o soluciones por parte del equipo de soporte.',
          backgroundImage: post2,
        },
        {
          title: '¿Cómo puedo utilizar la plataforma Pasco Jobs de manera efectiva?',
          content: '1. Crea un perfil completo y describe a que se dedica tu empresa \n2. Publica una oferta laboral detallada y lo mas clara posible, evita publicar contenido engañoso, publicitario o fuera de ámbito laboral, de lo contrario tu cuenta sera reportada por los usuarios y serás baneado de la plataforma \n3.Utiliza las distintas funcionalidades de la aplicación para filtrar y elegir al candidato ideal .\n4.Mantente al tanto de tu oferta laboral publicada y cambia el estado de tu oferta laboral de activo a finalizado una vez hayas culminado. \n5. Explora nuestra opción de ver Curriculum Vitae de cada candidato en la app, esto te ahorrará mucho tiempo en el proceso de selección.',
          backgroundImage: post3,
        },
        {
          title: '¿Cuáles son los términos de privacidad de Pasco Jobs?',
          content: '1. Pasco Jobs se compromete a proteger tu privacidad y la confidencialidad de tus datos personales.\n2. Tus datos serán tratados de acuerdo con las leyes y regulaciones de protección de datos aplicables.\n3. La información que proporciones al crear una cuenta  solo será utilizada con fines relacionados a tu proceso de selección .\n4. Pasco Jobs no compartirá tu información personal con terceros sin tu consentimiento, a menos que sea requerido por ley o necesario para cumplir con los servicios de la plataforma.',
          backgroundImage: post4,
        },
        {
          title: '¿Cuál es el propósito principal de Pasco Jobs?',
          content: '1. El propósito principal de Pasco Jobs es ser una plataforma que conecte a empleadores y buscadores de trabajo de manera eficiente y efectiva.\n2. Buscamos facilitar el proceso de búsqueda de empleo al proporcionar una amplia gama de oportunidades laborales y una interfaz intuitiva y fácil de usar.\n3. Nuestro objetivo es ayudar a los candidatos a encontrar el trabajo ideal y ayudar a las empresas a contratar a los candidatos adecuados de manera rápida y exitosa.\n4. Pasco Jobs se esfuerza por crear un entorno de empleo equitativo y promover el crecimiento profesional de nuestros usuarios. \n5. ¡Esta aplicación esta creada en Pasco y para Pasco!',
          backgroundImage: post5,
        },
        
      ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar/>

        <View style={{marginHorizontal:10,flex:1}}>
        <Text style={{color:COLORS.indigo800,fontFamily:FONT.bold,fontSize:SIZES.xLarge,marginTop:100,marginBottom:20,marginHorizontal:10}}>Información general de la aplicación - Empresas</Text>
          <FlatList
          showsVerticalScrollIndicator={false}
     
        data={posts}
        numColumns={2}
        renderItem={({ item }) => (
          <PostCardAccount
            title={item.title}
            content={item.content}
            backgroundImage={item.backgroundImage}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

        </View>
   
    </SafeAreaView>
  );
};

export default InformationCompanyScreen;

const styles = StyleSheet.create({});
