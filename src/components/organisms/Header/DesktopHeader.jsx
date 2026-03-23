"use client";
import DatePickerComp from "@/components/molecules/DatePickerComp";
import Popover from "@/components/molecules/Popover";
import SearchInput from "@/components/molecules/SearchInput";
import { HEADER_LINK } from "@/developmentContent/app-data";
import { LANGUAGE_DROPDOWN } from "@/developmentContent/dropdown-options";
import { Post } from "@/interceptor/axiosInterceptor";
import EmptyCartModal from "@/modals/EmptyCartModal/EmptyCartModal";
import LocationsModal from "@/modals/LocationsModal/LocationsModal";
import {
  getFormattedPrice,
  handleDecrypt,
  mergeClass,
} from "@/resources/utils/helper";
import { ClickAwayListener } from "@material-ui/core";
import Cookies from "js-cookie";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";
import { Button } from "../../atoms/Button";
import ImageDropDown from "../../atoms/ImageDropDown";
import OrderListCard from "../../molecules/OrderListCard";
import Style from "./DesktopHeader.module.css";

const DesktopHeader = ({
  logo = "/assets/images/app-images/logo.png",
  backgroundColor = "",
  containerClass = "",
  className = "",
}) => {
  const accessToken = handleDecrypt(Cookies?.get("_xpdx"));

  const { cart } = useSelector((state) => state?.cartReducer);
  const { location, isLogin } = useSelector((state) => state?.authReducer);
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState();
  const [showLocationsModal, setShowLocationsModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const [loading, setLoading] = useState("");
  const [language, setLanguage] = useState(() => {
    const googleTrans = Cookies.get("googtrans");
    if (googleTrans === "/en/es") return "ES";
    if (googleTrans === "/en/ht") return "HT";
    return "US";
  });
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD/MM/YYYY")
  );
  const [deliveryDates, setDeliveryDates] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getDeliveryDate = async (location) => {
    setLoading("getDeliveryDate");

    const payload = {
      custno: location?.ERP_CID,
      cshipno: location?.ERP_SID,
      date: moment().format("YYYY-MM-DD"),
    };

    const { response } = await Post({
      route: "order/order-dates",
      data: payload,
    });
    if (response) {
      const dates = response?.data?.data || [];
      setDeliveryDates(dates);

      if (dates.length > 0 && !selectedDate) {
        const firstDate = moment(dates[0]).format("DD/MM/YYYY");
        setSelectedDate(firstDate);
      }
    }
    setLoading("");
  };

  // useEffect(() => {
  //   setLoading("");
  // }, [pathname]);

  useEffect(() => {
    if (location && accessToken) {
      getDeliveryDate(location);
    }
  }, [location, accessToken]);

  const renderContent = () => {
    if (!mounted) return null;

    if (accessToken) {
      return (
        <div className={Style.navBtnLogin}>
          <Button
            variant="primary"
            label={"New Order"}
            onClick={() => router?.push("/products")}
            customStyle={{
              minWidth: "178px",
              height: "47px",
              fontWeight: 700,
              fontSize: "15px",
              marginRight: "12px",
            }}
          />

          <div
            className={Style.userCardDiv}
            // style={{ marginRight: "35px" }}
          >
            <span
              className="cursor-pointer"
              onClick={() => {
                if (cart?.length > 0) {
                  setLoading("showCartData");
                } else {
                  setShowEmptyCartModal(true);
                }
              }}
            >
              <div className={Style.cartDiv}>
                {cart?.length > 0 && (
                  <div className={Style.count}>
                    <p className={"fs-10"}>{cart.length}</p>
                  </div>
                )}
                <FaShoppingCart
                  color={"#4a4a4a"}
                  className={Style.shoppingCart}
                />
                {loading === "showCartData" && cart?.length > 0 && (
                  <ClickAwayListener
                    onClickAway={() => {
                      setLoading("");
                    }}
                  >
                    <div className={Style.cartDivPopover}>
                      <div className={Style.cartHeader}>
                        <h3 className="fs-20 fw-700">Your Order</h3>
                        <div className={Style.dateDiv}>
                          <h3 className="fs-20 fw-700">Delivery Date</h3>
                          <DatePickerComp
                            setValue={setSelectedDate}
                            value={selectedDate}
                            availableDates={deliveryDates}
                          />
                        </div>
                      </div>
                      <div className={Style?.productsList}>
                        {cart?.map((e, index) => (
                          <OrderListCard
                            data={e}
                            key={index}
                            index={index}
                            mainClass={
                              index === cart.length - 1 && Style.noBorderClass
                            }
                          />
                        ))}
                      </div>

                      <div className={Style.cartFooter}>
                        <div className={Style.totalAmountDiv}>
                          <h3 className="fs-16 fw-700">Subtotal</h3>
                          <h6 className="fs-16 fw-700">
                            {getFormattedPrice(
                              cart?.reduce((acc, curr) => {
                                // Always find the correct UOM based on selectedVariant value
                                const selectedUom =
                                  curr?.uoms?.find(
                                    (uom) =>
                                      uom.erp_uom ===
                                      curr?.selectedVariant?.value
                                  ) || curr?.uoms?.[0];

                                const itemPrice = selectedUom?.price || 0;
                                return acc + itemPrice * curr?.selectedCount;
                              }, 0)
                            )}
                          </h6>
                        </div>
                        <Button
                          variant="primary"
                          label={"Next"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLoading("");
                            const params = new URLSearchParams({
                              deliveryDate: selectedDate,
                              fromCart: "true",
                            });
                            router?.push(`/checkout?${params.toString()}`);
                          }}
                        />
                      </div>
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            </span>
            <div className={Style.divider}></div>
            <span
              className="cursor-pointer"
              onClick={() => {
                router?.push("/my-account");
              }}
            >
              <FaUser color={"#4a4a4a"} />
            </span>
            <div className={Style.divider}></div>
            <span
              className="cursor-pointer"
              onClick={() => setShowLocationsModal(true)}
            >
              <MdLocationOn color={"#4a4a4a"} />
            </span>
          </div>
          <ImageDropDown
            setDropdown={setLanguage}
            dropDown={language}
            options={LANGUAGE_DROPDOWN}
          />
        </div>
      );
    }

    return (
      <div className={Style.navBtn}>
        <Button
          variant="white-v2"
          label={"Sign Up"}
          onClick={() => router.push("/register")}
          customStyle={{
            marginRight: "35px",
          }}
        />
        <Button
          variant="primary"
          label={"Log In"}
          onClick={() => setShowLoginModal(!showLoginModal)}
          customStyle={{
            marginRight: "35px",
            fontWeight: 600,
          }}
        />

        <ImageDropDown
          setDropdown={setLanguage}
          dropDown={language}
          options={LANGUAGE_DROPDOWN}
        />
      </div>
    );
  };

  return (
    <div className={Style.navbarMain}>
      <Container
        className={mergeClass(
          Style.navbarContainer,
          containerClass,
          "mainContainer"
        )}
      >
        <Navbar
          collapseOnSelect
          expand="lg"
          className={`${Style.header} ${className}`}
          style={{ backgroundColor }}
          id="navDesktopHeader"
        >
          <div
            className={Style.main_logo_main}
            onClick={() => router.push("/")}
          >
            <Image
              src={logo}
              alt="Logo"
              style={{
                objectFit: "contain",
                objectPosition: "left",
                cursor: "pointer",
              }}
              height={65}
              width={200}
            />
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className={Style.navbarCollapse}
            id="responsive-navbar-nav"
          >
            <SearchInput
              placeholder={"Search for products..."}
              search={search}
              setSearch={setSearch}
              rightIconGreenVariant
              rightIconColor={"var(--white-color)"}
              rightIconClass={Style.customRightICon}
            />

            <Nav
              className={`ms-auto ${Style.navbarCustom}`}
              style={{
                paddingInline: accessToken ? "47.5px 32px" : "79px 49px",
              }}
              gap={5}
            >
              {HEADER_LINK?.map((item, index) => (
                <Link
                  key={index}
                  href={item?.path}
                  className={[
                    Style.nabarLinks,
                    pathname === item.path && Style.navActive,
                  ].join(" ")}
                >
                  {item?.label}
                </Link>
              ))}
            </Nav>

            <div className={Style.dflex}>{renderContent()}</div>
          </Navbar.Collapse>
        </Navbar>
      </Container>

      {showLoginModal && <Popover setShowLoginModal={setShowLoginModal} />}
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

export default DesktopHeader;
