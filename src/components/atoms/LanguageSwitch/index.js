import { Switch } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import classes from "./LanguageSwitch.module.css";

function LanguageSwitch() {
  const googleTrans = Cookies.get("googtrans");
  let oldData = null;
  const [loading, setLoading] = useState(false);

  const handleChangeLanguage = async () => {
    setLoading(true);
    oldData = googleTrans;
    Cookies.remove("googtrans", {
      path: "/",
      domain: `${window?.location?.hostname}`,
    });
    Cookies.remove("googtrans", {
      path: "/",
      domain: `.${window?.location?.hostname}`,
    });
    if (oldData == "/en/es") {
      Cookies.set("googtrans", `/en/ht`);
    } else if (oldData == "/en/ht") {
      Cookies.set("googtrans", `/en/en`);
    } else {
      Cookies.set("googtrans", `/en/es`);
    }
    window.location.reload();
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
