import { COLORS } from "@constants/theme";
import * as React from "react";
import { FAB, Portal } from "react-native-paper";
import { Linking } from "react-native";
import iconLogo from "@assets/adaptive-icon.png";
const CompanyScreenProfileContactFab = ({ infoCompany }) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const actions = [];

  if (infoCompany?.phone) {
    actions.push({
      icon: "phone",
      labelTextColor: "white",
      label: "Llamar",
      onPress: () => Linking.openURL(`tel:${infoCompany?.phone}`).catch((e)=>console.log(e)),
    });
  }

  if (infoCompany?.whatsapp) {
    actions.push({
      icon: "whatsapp",
      labelTextColor: "white",
      label: "Escribir por Whatsapp",
      onPress: () => Linking.openURL(`https://api.whatsapp.com/send?phone=${infoCompany?.whatsapp}`).catch((e)=>console.log(e)),
    });
  }
  if (infoCompany?.contactEmail) {
    actions.push({
      icon: "email",
      labelTextColor: "white",
      label: "Escribir por email",
      onPress: () => Linking.openURL(`mailto:${infoCompany?.contactEmail}`).catch((e)=>console.log(e)),
    });
  }



  return (
    <Portal>
      <FAB.Group
        backdropColor={"rgba(0, 0, 0, 0.9)"}
        open={open}
        visible
        color="white"
        theme={{mode:"exact"}}
        fabStyle={{backgroundColor:COLORS.tertiary}}
        variant="primary"
        icon={open ? iconLogo : "plus"}
        onStateChange={onStateChange}
        actions={actions}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default CompanyScreenProfileContactFab;
