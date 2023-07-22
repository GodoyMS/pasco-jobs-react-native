import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfigUserAds = {
    key: 'rootUserAds', // the key for the root of your Redux store
    storage: AsyncStorage, // the storage mechanism (AsyncStorage for React Native)
    // Optionally, you can blacklist specific reducers to exclude them from being persisted
    // blacklist: ['someReducer'],

  };
  
  export default persistConfigUserAds;