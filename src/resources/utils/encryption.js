import CryptoJS from "crypto-js";
import { config } from "@/config";

export const handleEncrypt = (message) => {
  const encrypted = CryptoJS.AES.encrypt(message, config?.secretKey).toString();
  return encrypted;
};
