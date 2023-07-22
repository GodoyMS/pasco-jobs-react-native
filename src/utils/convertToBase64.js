import { convertBlobToBase64 } from "./convertBlobToBase64";

export const convertToBase64 = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const base64 = await convertBlobToBase64(blob);
      return base64;
    } catch (error) {

      return null;
    }
  };