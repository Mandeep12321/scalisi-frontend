"use client";
import ImageDropDown from "@/components/atoms/ImageDropDown";
import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import SearchInput from "@/components/molecules/SearchInput";
import { MOBILE_HEADER_LINK } from "@/developmentContent/app-data";
import { LANGUAGE_DROPDOWN } from "@/developmentContent/dropdown-options";
import { handleDecrypt, mergeClass } from "@/resources/utils/helper";
import { signOutRequest } from "@/store/auth/authSlice";
import { clearCart } from "@/store/cart/cartSlice";
import { setDrawerOpen } from "@/store/common/commonSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import { Button } from "../../atoms/Button";
import Style from "./MobileHeader.module.css";
import { MdLocationOn } from "react-icons/md";
import LocationsModal from "@/modals/LocationsModal/LocationsModal";
import EmptyCartModal from "@/modals/EmptyCartModal/EmptyCartModal";
import { persistor } from "@/store";

const MobileHeader = ({
  logo = "/assets/images/app-images/logo.png",
  containerClass = "",
  className = "",
}) => {
  const dispatch = useDispatch();
  const accessToken = handleDecrypt(Cookies?.get("_xpdx"));
  const { cart } = useSelector((state) => state?.cartReducer);

  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState();
  const [language, setLanguage] = useState(() => {
    const googleTrans = Cookies.get("googtrans");
    if (googleTrans === "/en/es") return "ES";
    if (googleTrans === "/en/ht") return "HT";
    return "US";
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLocationsModal, setShowLocationsModal] = useState(false);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch(setDrawerOpen(isDrawerOpen));
  }, [isDrawerOpen]);

  // if window is resized, and width is higher than 1199 close the drawer
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1199) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // renderContent
  const renderContent = () => {
    if (!mounted) return null;

    if (accessToken) {
      return (
        <div className={Style.navBtn}>
          <ImageDropDown
            setDropdown={setLanguage}
            dropDown={language}
            options={LANGUAGE_DROPDOWN}
          />
          <div className={Style.drawerIcon}>
            <span
              className={mergeClass("cursor-pointer", Style.userDiv)}
              onClick={() => {
                router?.push("/my-account");
                setIsDrawerOpen(false);
              }}
            >
              <PiUserCircleFill color={"var(--icon-color)"} size={30} />
            </span>
            <div
              className={Style.cartDiv}
              onClick={() => {
                if (cart?.length > 0) {
                  const params = new URLSearchParams({
                    fromCart: "true",
                  });
                  router?.push(`/checkout?${params.toString()}`);
                  setIsDrawerOpen(false);
                } else {
                  setShowEmptyCartModal(true);
                  setIsDrawerOpen(false);
                }
              }}
            >
              {cart?.length > 0 && (
                <div className={Style.count}>
                  <p className={"fs-12"}>{cart?.length}</p>
                </div>
              )}
              <FaShoppingCart
                size={20}
                color={"var(--icon-color)"}
                className={Style.shoppingCart}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={Style.navBtn}>
        <ImageDropDown
          setDropdown={setLanguage}
          dropDown={language}
          options={LANGUAGE_DROPDOWN}
        />
        <Button
          variant="white-v2"
          label={"Sign Up"}
          className={Style.drawerSignup}
          onClick={() => {
            router.push("/register");
            setIsDrawerOpen(false);
          }}
        />
        <Button
          variant="primary"
          label={"Log In"}
          className={Style.drawerLogin}
          onClick={() => {
            router.push("/login");
            setIsDrawerOpen(false);
          }}
        />
      </div>
    );
  };

  const logout = async () => {
    // Clear all cookies aggressively
    Cookies.remove("_xpdx_u", { path: "/" });
    Cookies.remove("_xpdx", { path: "/" });
    Cookies.remove("_xpdx_rf", { path: "/" });

    // Clear localStorage
    localStorage.removeItem("orderPlaced");
    localStorage.removeItem("RT_ERROR_IDENTIFIER");
    localStorage.removeItem("persist:root");

    // Clear all Redux state
    dispatch(signOutRequest());
    dispatch(clearCart());
    setIsDrawerOpen(false);

    // Clear Redux persisted state safely
    persistor.pause();
    await persistor.flush();
    await persistor.purge();

    // Show success message
    const isSpanish = language === "ES";
    RenderToast({
      type: "success",
      message: isSpanish ? "Cierre de sesión exitoso" : "Successfully logout",
    });

    // Navigate to login
    window.location.href = "/login";
  };

  return (
    <div
      className={Style.navbarMain}
      style={{
        marginLeft: isDrawerOpen ? "-284px" : "0",
        transition: "margin-left 0.5s ease",
      }}
    >
      <Container
        className={`${Style.navbarContainer} ${containerClass} mainContainer`}
      >
        <Navbar
          expand="xl"
          className={`${Style.header} ${className}`}
          style={{ gap: "20px", paddingBlock: "20px" }}
        >
          <div
            className={Style.main_logo_main}
            onClick={() => router.push("/")}
          >
            <Image
              src={logo}
              alt="Logo"
              style={{ objectFit: "contain", objectPosition: "left" }}
              height={65}
              width={200}
            />
          </div>
          {/*  */}
          <div className={Style.navbarRight}>
            {accessToken && (
              <div
                className={Style.cartDiv}
                onClick={() => {
                  if (cart?.length > 0) {
                    const params = new URLSearchParams({
                      fromCart: "true",
                    });
                    router?.push(`/checkout?${params.toString()}`);
                  } else {
                    setShowEmptyCartModal(true);
                  }
                }}
              >
                {cart?.length > 0 && (
                  <div className={Style.count}>
                    <p className={"fs-12"}>{cart.length}</p>
                  </div>
                )}
                <FaShoppingCart
                  size={20}
                  color={"var(--icon-color)"}
                  className={Style.shoppingCart}
                />
              </div>
            )}
            {accessToken && (
              <div
                className={Style.cartDiv}
                onClick={() => setShowLocationsModal(true)}
              >
                <MdLocationOn
                  color={"var(--icon-color)"}
                  className={Style.shoppingCart}
                  size={20}
                />
              </div>
            )}
            <Button
              onClick={() => setIsDrawerOpen(true)}
              customStyle={{ padding: "0px", height: "46px", width: "46px" }}
              className={Style.drawerToggle}
            >
              <div className={Style.imgDiv}>
                <Image
                  src={"/assets/images/app-images/ham-burger.png"}
                  alt=""
                  fill
                />
              </div>
            </Button>
          </div>

          {/*  */}
          <SearchInput
            placeholder={"Search for products..."}
            search={search}
            setSearch={setSearch}
            rightIconGreenVariant
            rightIconColor={"var(--white-color)"}
          />
        </Navbar>
      </Container>
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction="right"
        className={Style.drawer}
      >
        <div className={Style?.drawerContent}>
          <div className={Style.drawerHead}>{renderContent()}</div>

          <Nav className={`ms-auto ${Style.navbarCustom__style}`} gap={5}>
            {MOBILE_HEADER_LINK?.map(({ Icon, separator, ...item }, index) => {
              if (!accessToken && item?.label === "Order Guide") return null;
              
              return (
                <div key={index}>
                  {separator ? (
                    <hr className={Style.separator} />
                  ) : (
                    <Link
                      href={item?.path}
                      className={[
                        Style.navbarLinks,
                        pathname === item?.path && Style.navActive,
                      ].join(" ")}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {Icon && <Icon size={18} />}
                      {item?.imageUrl && <ReactSVG src={item?.imageUrl} />}
                      {item?.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </Nav>
        </div>
        <div className={Style.dflex}>
          {accessToken && (
            <div className={Style.navBtnLogin}>
              <Button variant="primary" label={"Logout"} onClick={logout} />
            </div>
          )}
        </div>
      </Drawer>
      {showLocationsModal && (
        <LocationsModal
          show={showLocationsModal}
          setShow={setShowLocationsModal}
          // cb={(location) => getProducts({ pg: 1, location })}
        />
      )}
      {showEmptyCartModal && (
        <EmptyCartModal
          show={showEmptyCartModal}
          setShow={setShowEmptyCartModal}
        />
      )}
    </div>
  );
};

export default MobileHeader;
