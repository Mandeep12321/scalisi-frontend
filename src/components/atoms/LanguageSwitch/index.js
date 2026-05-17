import { Switch } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { changeGoogleTranslateLanguage } from "@/resources/utils/helper";
import classes from "./LanguageSwitch.module.css";

function LanguageSwitch() {
  const [googleTrans, setGoogleTrans] = useState(() => Cookies.get("googtrans"));
  const [loading, setLoading] = useState(false);

  const handleChangeLanguage = async () => {
    setLoading(true);

    const nextLanguage =
      googleTrans === "/en/es" ? "HT" : googleTrans === "/en/ht" ? "EN" : "ES";

    changeGoogleTranslateLanguage(nextLanguage);
    setGoogleTrans(getGoogleTransValue(nextLanguage));
    setLoading(false);
  };

  const getGoogleTransValue = (lang) => {
    if (lang === "ES") return "/en/es";
    if (lang === "HT") return "/en/ht";
    return "/en/en";
  };

  const getCurrentLanguage = () => {
    if (googleTrans == "/en/es") return "ESP";
    if (googleTrans == "/en/ht") return "HT";
    return "ENG";
  };

  const getNextLanguage = () => {
    if (googleTrans == "/en/es") return "HT";
    if (googleTrans == "/en/ht") return "ENG";
    return "ESP";
  };

  return (
    <div className={classes.switchDiv}>
      <Switch
        checked={googleTrans == "/en/es" || googleTrans == "/en/ht"}
        onChange={!loading && handleChangeLanguage}
        color="error"
        className={classes.switch}
      />
      <p>{getCurrentLanguage()}</p>
    </div>
  );
}

export default LanguageSwitch;
