import CryptoJS from "crypto-js";
import { config } from "@/config";

export const mediaUrl = (url) => {
  if (!url) return "";

  if (url.startsWith("/")) return url;

  const result = url.indexOf("http");

  const imageRenderUrl = result === -1 ? `${config?.S3_URL}/${url}` : url;

  return imageRenderUrl;
};

//
export const mergeClass = (...classes) => {
  return classes.join(" ");
};

export const getFormattedPrice = (price, currency = "$") => {
  return `${currency}${parseFloat(price).toFixed(2)}`;
};

export const handleDecrypt = (encryptedMessage = "") => {
  if (!encryptedMessage) return "";

  try {
    const decrypted = CryptoJS.AES.decrypt(
      encryptedMessage,
      config?.secretKey
    ).toString(CryptoJS.enc.Utf8);

    return decrypted;
  } catch (error) {
    return "";
  }
};

export const formattedKey = (key) => {
  return key
    ?.replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str?.toUpperCase());
};
export const BaseURL = (link) => `${config?.apiBaseUrl}/api/v1/${link}`;

export const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }
};

export const CreateFormData = (data) => {
  const formData = new FormData();
  for (let key in data) {
    if (Array.isArray(data[key])) {
      for (let d in data[key]) {
        if (typeof data[key][d] == "string") {
          formData.append(key, data[key][d]);
        } else if (
          data[key][d] instanceof File ||
          data[key][d] instanceof Date
        ) {
          formData.append(key, data[key][d]);
        } else {
          formData.append(key, JSON.stringify(data[key][d]));
        }
      }
    } else if (typeof data[key] == "object") {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

export const capitalizeFirstLetter = (l) =>
  l.charAt(0).toUpperCase() + l.slice(1);

export function htmlToText(html) {
  if (!html) return "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

/**
 * Detect if the current device is iOS
 * @returns {boolean} True if the device is iOS (iPhone, iPad, iPod)
 */
export const isIOSDevice = () => {
  if (typeof window === "undefined") return false;

  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const platform = navigator.platform || "";

  return (
    /iPad|iPhone|iPod/.test(userAgent) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
};
