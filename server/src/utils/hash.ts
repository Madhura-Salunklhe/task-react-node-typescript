import CryptoJS from "crypto-js";

export const generateEmailHash = (email: string) => {
  return CryptoJS.SHA256(
    email.trim().toLowerCase()
  ).toString();
};