"use client";

import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { signOutRequest } from "@/store/auth/authSlice";
import { clearCart } from "@/store/cart/cartSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { persistor } from "@/store";

const Header = ({
  backgroundColor,
  containerClass,
  className,
  logo,
  customStyle,
  showModal,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(showModal || "");
  const [isMobile, setIsMobile] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const logout = async () => {
    // Clear all cookies
    Cookies.remove("_xpdx_u");
    Cookies.remove("_xpdx");
    Cookies.remove("_xpdx_rf");

    // Clear localStorage
    localStorage.removeItem("orderPlaced");
    localStorage.removeItem("RT_ERROR_IDENTIFIER");

    // Clear all Redux state
    dispatch(signOutRequest());
    dispatch(clearCart());

    await persistor.purge();
    // Show success message
    RenderToast({
      type: "success",
      message: isSpanish ? "Cierre de sesión exitoso" : "Successfully logout",
    });

    // Navigate to homepage - use window.location for more reliable logout redirect
    window.location.href = "/";
  };

  function onScroll() {
    if (window.scrollY > 160) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }

  useEffect(() => {
    window?.addEventListener("scroll", onScroll);
    isMobileViewHook(setIsMobile, 1200);
  }, []);

  useEffect(() => {
    if (showModal) {
      setIsModalOpen(showModal);
    }
  }, [showModal]);

  return (
    <>
      {isMobile ? (
        <MobileHeader
          logo={logo}
          customStyle={customStyle}
          containerClass={containerClass}
          isScroll={isScroll}
          onLogout={logout}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <DesktopHeader
          logo={logo}
          backgroundColor={backgroundColor}
          containerClass={containerClass}
          className={className}
          isScroll={isScroll}
          onLogout={logout}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default Header;

Header.propTypes = {
  backgroundColor: PropTypes.string,
  containerClass: PropTypes.string,
  className: PropTypes.string,
  logo: PropTypes.object,
  customStyle: PropTypes.object,
};
