import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import PostCardAccount from "@components/cards/PostCardAccount";
import post1 from "@assets/images/information/apply.png";
import post2 from "@assets/images/information/report_ps.png";
import post4 from "@assets/images/information/privacy.png";

import post3 from "@assets/images/company/defaultprofilecompany-min.png"
import post5 from "@assets/images/information/goal.png"
import { COLORS, FONT, SIZES } from "@constants/theme";
const InformationUserScreeen = () => {
    const posts = [
        {
          title: '¿Cómo puedo aplicar para un trabajo en Pasco Jobs?',
          content: '1. Inicia sesión en tu cuenta de Pasco Jobs o crea una nueva si aún no tienes una.\n2. Explora los listados de trabajos disponibles y encuentra aquellos que se ajusten a tus preferencias.\n3. Lee los detalles del trabajo y, si estás interesado, selecciona "Aplicar" o "Postular" para enviar tu solicitud.\n4. Completa los campos requeridos, como tu currículum vitae o cualquier otra información solicitada.\n5. Envía tu solicitud y mantén un seguimiento de las actualizaciones a través de la aplicación.',
          backgroundImage: post1,
        },
        {
          title: '¿Cómo puedo reportar un problema en Pasco Jobs?',
          content: '1. Dirígete a la sección de "Reportar un problema" dentro de la aplicación Pasco Jobs.\n2. Describe detalladamente el problema que estás experimentando, incluyendo cualquier mensaje de error o comportamiento inesperado.(Esto ayudara enormemente a mejorar la aplicación) \n3. Envía tu reporte y mantente atento a las respuestas o soluciones por parte del equipo de soporte.\n4 Para reportar ofertas laborales con contenido inadecuado o engañoso, presiona en el icono de bandera y proporciona la causa del reporte.',
          backgroundImage: post2,
        },
        {
          title: '¿Cómo puedo utilizar la plataforma Pasco Jobs de manera efectiva?',
          content: '1. Crea un perfil completo y atractivo que destaque tus habilidades y experiencia profesional.\n2. Explora los diferentes filtros de búsqueda para encontrar trabajos relevantes según tus preferencias, ubicación y nivel de experiencia.\n3. Utiliza las funciones de guardado o favoritos para marcar los trabajos que te interesen y revisarlos más tarde.\n4.Postula facilmente al trabajo que desees con el boton que se encuentra en la parte inferior de cada oferta de trabajo.  \n5. Mantén tu perfil y currículum actualizados, y revisa regularmente las nuevas oportunidades laborales. ',
          backgroundImage: post3,
        },
        {
          title: '¿Cuáles son los términos de privacidad de Pasco Jobs?',
          content: '1. Pasco Jobs se compromete a proteger tu privacidad y la confidencialidad de tus datos personales.\n2. Tus datos serán tratados de acuerdo con las leyes y regulaciones de protección de datos aplicables.\n3. La información que proporciones al crear una cuenta o aplicar para un trabajo solo será utilizada con fines relacionados al proceso de empleo.\n4. Pasco Jobs no compartirá tu información personal con terceros sin tu consentimiento, a menos que sea requerido por ley o necesario para cumplir con los servicios de la plataforma.',
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

        <View style={{marginHorizontal:10,flex:1}}>
        <Text style={{color:COLORS.indigo800,fontFamily:FONT.bold,fontSize:SIZES.xLarge,marginTop:100,marginBottom:20,marginHorizontal:10}}>Información general de la aplicación</Text>
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

export default InformationUserScreeen;

const styles = StyleSheet.create({});
