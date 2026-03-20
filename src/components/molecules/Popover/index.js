import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import LoginComponent from "@/components/organisms/LoginComponent";
import { Post } from "@/interceptor/axiosInterceptor";
import { handleEncrypt } from "@/resources/utils/encryption";
import { saveLoginUserData } from "@/store/auth/authSlice";
import { ClickAwayListener } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Popover({ setShowLoginModal, redirectUrl }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState("");

  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  // when login response is success then set the user data in the redux store and cookies and redirect to the home page

  const handleLogin = async (values) => {
    setLoading("loggingIn");

    const response = await Post({ route: "auth/login", data: values });

    if (response && response?.response?.data?.status == "success") {
      const data = response?.response?.data?.data;

      const updatedData = {
        user: values?.username,
        token: data?.token,
      };

      dispatch(saveLoginUserData(updatedData));
      Cookies.set("_xpdx_u", JSON.stringify(values), { expires: 90 });
      Cookies.set("_xpdx", handleEncrypt(String(data?.token)), { expires: 90 });

      setShowLoginModal(false);
      const finalRedirectUrl = redirectUrl || "/";
      window.location.href = finalRedirectUrl;
      RenderToast({
        type: "success",
        message: isSpanish ? "Inicio de sesión exitoso." : "Login Successful.",
      });
    }

    setLoading("");
  };

  return (
    <ClickAwayListener onClickAway={() => setShowLoginModal(false)}>
      <div>
        <LoginComponent
          handleLogin={handleLogin}
          loading={loading}
          setLoading={setLoading}
          setShow={setShowLoginModal}
          show={true}
        />
      </div>
    </ClickAwayListener>
  );
}
