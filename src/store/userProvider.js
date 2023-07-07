import { userStore } from "./contextUser";
import { userPersistor } from "./contextUser";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const UserProvider = ({ children }) => (
  <Provider store={userStore}>
    <PersistGate loading={null} persistor={userPersistor}>
      {children}
    </PersistGate>
  </Provider>
);

export default UserProvider