import CryptoJS from "crypto-js";

const FRONTEND_SECRET = "myfrontendsecret";

export const encryptField = (value: string) => {
  return CryptoJS.AES.encrypt(
    value,
    FRONTEND_SECRET
  ).toString();
};

export const decryptField = (encryptedValue: string) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedValue,
    FRONTEND_SECRET
  );

  return bytes.toString(CryptoJS.enc.Utf8);
};