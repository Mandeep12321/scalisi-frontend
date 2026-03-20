"use client";

import { Button } from "@/components/atoms/Button";
import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import CheckoutCard from "@/components/molecules/CheckoutCard/CheckoutCard";
import Counter from "@/components/molecules/Counter";
import HeroSection from "@/components/molecules/HeroSection";
import OrderSummary from "@/components/molecules/OrderSummary";
import ShippingDetails from "@/components/organisms/ShippingDetails/ShippingDetails";
import Table from "@/components/organisms/Table";
import { MY_ORDERS_CMS_DATA } from "@/developmentContent/mock-data";
import { ORDER_SHIPPING_DETAILS_KEYS } from "@/formik/initial-values/initial-values";
import { ORDER_SHIPPING_DETAILS_SCHEMA } from "@/formik/schema/OrderShippingDetailSchema";
import { Post } from "@/interceptor/axiosInterceptor";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import {
  getFormattedPrice,
  handleDecrypt,
  mergeClass,
} from "@/resources/utils/helper";
import {
  clearCart,
  removeProductFromCart,
  updateNoteInCart,
  updateQuantity,
} from "@/store/cart/cartSlice";
import { City, Country, State } from "country-state-city";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import moment from "moment";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiSolidFilePlus } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import classes from "./OrdersPageView.module.css";

export default function OrdersPageView() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const cartData = useSelector((state) => state?.cartReducer?.cart);
  const { location, user } = useSelector((state) => state?.authReducer);
  const accessToken = handleDecrypt(Cookies?.get("_xpdx"));
  const [cmsData, setCMSData] = useState(MY_ORDERS_CMS_DATA || []);
  const [data, setData] = useState(cartData || []);
  const [isEditable, setIsEditable] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [noteIndex, setNoteIndex] = useState(-1);
  const [addNote, setAddNote] = useState("");
  const [isMobile375, setIsMobile375] = useState(false);
  const [isMobile768, setIsMobile768] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [checkoutContext, setCheckoutContext] = useState({
    deliveryDate: null,
    fromCart: false,
  });
  const [isInitializing, setIsInitializing] = useState(true);
  const [deliveryDates, setDeliveryDates] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    orderNote: "",
    purchaseOrder: "",
  });

  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const shippingDetailFormik = useFormik({
    initialValues: ORDER_SHIPPING_DETAILS_KEYS,
    validationSchema: ORDER_SHIPPING_DETAILS_SCHEMA({
      isCityReq: cities?.length > 0 ? true : false,
      isStateReq: states?.length > 0 ? true : false,
    }),
    onSubmit: (values) => {
      // handleSubmit(values);
      router.push("/shipping");
    },
    validateOnChange: true,
  });

  const submitOrder = async (orderData) => {
    setLoading("submitOrder");

    const orderItems = orderData.items.map((item) => {
      // Always find the correct UOM based on selectedVariant value
      const selectedUom =
        item?.uoms?.find(
          (uom) => uom.erp_uom === item?.selectedVariant?.value
        ) || item?.uoms?.[0];

      const orderItem = {
        item: String(item.itemid || item._id || ""),
        quantity: item.selectedCount,
        uom: selectedUom?.erp_uom,
        price: selectedUom?.price,
        note: item.note || "",
        variant: item.selectedVariant?.value,
      };

      return orderItem;
    });

    const payload = {
      items: orderItems,
      orderNote: orderData.orderSummary.orderNote || "",
      purchaseOrder: orderData.orderSummary.purchaseOrder || "",
      deliverydate: moment(orderData.deliveryDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      ),
      totalAmount: orderData.totalAmount,
      totalQuantity: orderData.totalQuantity,
      ERP_CID: String(location?.ERP_CID || ""),
      ERP_SID: String(location?.ERP_SID || ""),
      userid: String(user || ""),
    };

    const { response } = await Post({
      route: "order",
      data: payload,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: isSpanish
          ? "¡Pedido enviado exitosamente!"
          : "Order submitted successfully!",
      });

      setTimeout(() => {
        dispatch(clearCart());
        setOrderPlaced(true);
        // Save to localStorage
        localStorage.setItem("orderPlaced", "true");
      }, 3000);
    }
    setLoading("");
  };

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
    }
    setLoading("");
  };

  //   use effect
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    const deliveryDate = searchParams.get("deliveryDate");
    const fromCart = searchParams.get("fromCart") === "true";
    setCheckoutContext({
      deliveryDate,
      fromCart,
    });
    setIsInitializing(false);
  }, [searchParams]);

  useEffect(() => {
    setData(cartData);
    // if (cartData.length === 0) {
    //   RenderToast({
    //     type: "warning",
    //     message: isSpanish ? "Tu carrito está vacío." : "Your cart is empty.",
    //   });
    // }
  }, [cartData]);

  useEffect(() => {
    isMobileViewHook(setIsMobile375, 376);
    isMobileViewHook(setIsMobile768, 768);
    isMobileViewHook(setIsMobile, 1200);
  });

  useEffect(() => {
    if (location && accessToken) {
      getDeliveryDate(location);
    }
  }, [location, accessToken]);

  // Check localStorage on component mount
  useEffect(() => {
    const savedOrderPlaced = localStorage.getItem("orderPlaced");
    if (savedOrderPlaced === "true") {
      setOrderPlaced(true);
    }
  }, []);

  // Scroll to top when order is placed
  useEffect(() => {
    if (orderPlaced) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [orderPlaced]);

  // Auto redirect to landing page after 3 seconds when order is placed
  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => {
        // Clear localStorage and redirect to landing page
        localStorage.removeItem("orderPlaced");
        router.push("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [orderPlaced, router]);

  //   handleCountryChange
  const handleCountryChange = (selectedCountry) => {
    const countryIsoCode = selectedCountry?.value;
    const citiesOfCountry = City.getCitiesOfCountry(countryIsoCode);
    const statesOfCountry = State.getStatesOfCountry(countryIsoCode);

    const updatedCountry = {
      ...selectedCountry,
      hasCities: citiesOfCountry.length > 0,
      hasStates: statesOfCountry.length > 0,
    };

    shippingDetailFormik.setFieldValue("country", updatedCountry);
    setCities(citiesOfCountry);
    setStates(statesOfCountry);

    shippingDetailFormik.setFieldValue("city", null);
    shippingDetailFormik.setFieldValue("state", null);
    shippingDetailFormik.setErrors({});
  };

  const handleAddNote = (index) => {
    if (noteIndex === index) {
      // need to add note field in current index of cart data and update the cart data in redux
      dispatch(
        updateNoteInCart({
          note: addNote,
          productId: data[index]?.itemid || data[index]?._id,
          productVariant: data[index]?.selectedVariant?.value,
        })
      );
      setAddNote("");
      setNoteIndex(-1);
    } else {
      setAddNote(data[index]?.note || "");
      setNoteIndex(index);
    }
  };

  const handleChange = (name, value) => {
    setOrderSummary((prev) => ({ ...prev, [name]: value }));
  };

  // table header
  const tableHeader = [
    {
      id: "item",
      label: "Item",
      style: { width: "56%" },
      renderValue: (e, index) => {
        const item = e?.item;
        return (
          <div className={classes.cardWrapper} key={index}>
            <div className={classes.imageDiv}>
              <Image fill alt={item?.title} src={item?.image} />
            </div>
            <div className={classes.cardBody}>
              <h3
                className={mergeClass(classes.title, "fs-18 fw-500 maxLine2")}
              >
                {item?.title}
              </h3>
              <p className={mergeClass("fs-15 fw-500", classes.productId)}>
                {item?.productId}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "quantity",
      label: "Quantity",
      style: { width: "24%", textAlign: "center" },
      renderValue: (e, index) => {
        const item = e?.quantity;

        return (
          <div className={classes.counterDiv}>
            <Counter
              data={item?.count}
              setData={(newCount) => {
                dispatch(
                  updateQuantity({
                    _id: e?._id,
                    quantityChange: newCount,
                    productVariant: data[index]?.selectedVariant?.value,
                  })
                );
                const updatedData = [...data];
                updatedData[index] = {
                  ...updatedData[index],
                  selectedCount: newCount,
                };
                setData(updatedData);
              }}
            />
            <p
              className={mergeClass(
                "fs-14 fw-600 cursor-pointer",
                classes.type
              )}
            >
              {item?.type}
              {/* case not cases */}
            </p>
            <p
              className={mergeClass(
                "fs-15 fw-600 cursor-pointer",
                classes.removeLink
              )}
              onClick={() => {
                dispatch(
                  removeProductFromCart({
                    _id: e?._id,
                    productVariant: data[index]?.selectedVariant?.value,
                  })
                );
                RenderToast({
                  type: "success",
                  message: isSpanish
                    ? "Producto eliminado del carrito exitosamente."
                    : "Product Removed From Cart. Successfully.",
                });
              }}
            >
              Remove
            </p>
          </div>
        );
      },
    },
    {
      id: "price",
      label: "Price",
      style: { width: "20%", fontWeight: 700, textAlign: "end" },
      renderValue: (item, index) => {
        return (
          <div className={classes.priceDiv}>
            <p className="fs-22 fw-700">{item?.price}</p>
            <div
              className={mergeClass("cursor-pointer", classes.addNote)}
              onClick={() => handleAddNote(index)}
            >
              <BiSolidFilePlus className={classes.noteIcon} />
              <p className="fs-15 fw-700">
                {noteIndex === index
                  ? isSpanish
                    ? "Enviar nota"
                    : "Submit Note"
                  : item?.note
                  ? isSpanish
                    ? "Editar nota"
                    : "Edit Note"
                  : isSpanish
                  ? "Añadir nota"
                  : "Add note"}
              </p>
            </div>
            {item?.note && noteIndex !== index && (
              <div
                className={mergeClass("cursor-pointer", classes.removeNote)}
                onClick={() => {
                  dispatch(
                    updateNoteInCart({
                      note: "",
                      productId: item?._id,
                      productVariant: data[index]?.selectedVariant?.value,
                    })
                  );
                  RenderToast({
                    type: "success",
                    message: isSpanish
                      ? "Nota eliminada exitosamente."
                      : "Note Removed Successfully.",
                  });
                }}
              >
                <IoIosRemoveCircle className={classes.noteIcon} />
                <p className="fs-15 fw-700">
                  {isSpanish ? "Eliminar nota" : "Remove Note"}
                </p>
              </div>
            )}
            {noteIndex === index && !item?.note && (
              <div
                className={mergeClass("cursor-pointer", classes.cancelNote)}
                onClick={() => setNoteIndex(-1)}
              >
                <MdCancel className={classes.noteIcon} />
                <p className="fs-15 fw-700">
                  {isSpanish ? "Cancelar" : "Cancel"}
                </p>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // table body

  const tableBody = data?.map((e) => {
    // Always find the correct UOM based on selectedVariant value
    const selectedUom =
      e?.uoms?.find((uom) => uom.erp_uom === e?.selectedVariant?.value) ||
      e?.uoms?.[0];

    const itemPrice = selectedUom?.price || 0;
    const totalPrice = itemPrice * e?.selectedCount;

    const tableItem = {
      item: {
        title: e?.description || e?.title,
        image: e?.fullimagepath || e?.image,
        productId: e?.itemid || e?.productId,
      },
      quantity: {
        type: e?.selectedVariant?.value,
        count: e?.selectedCount,
      },
      price: getFormattedPrice(totalPrice),
      note: e?.note,
      _id: e?.itemid || e?._id,
    };

    console.log("Created tableItem:", tableItem);
    return tableItem;
  });

  const OrderPlaced = () => {
    return (
      <div className={classes.orderPlacedContainer}>
        <FaCircleCheck size={140} color="var(--primary-color )" />
        <h1 className="fs-35 fw-700">Success!</h1>
        <p className={mergeClass(classes.orderPlacedText, "fs-21 fw-600")}>
          Your order has been successfully placed. Thank you!
        </p>
        <Button
          className={mergeClass("fs-14 fw-700", classes.orderPlacedBtn)}
          label="My Orders"
          variant="primary"
          onClick={() => {
            // Clear localStorage when navigating away
            localStorage.removeItem("orderPlaced");
            router.push("/my-orders");
          }}
        />
      </div>
    );
  };

  const renderOrderSummery = () => {
    return (
      <OrderSummary
        data={data}
        handleChange={handleChange}
        orderSummary={orderSummary}
        setOrderPlaced={setOrderPlaced}
        deliveryDate={checkoutContext.deliveryDate}
        deliveryDates={deliveryDates}
        submitOrder={submitOrder}
        loading={loading === "submitOrder"}
      />
    );
  };

  const renderShipping = () => {
    return (
      <ShippingDetails
        handleCountryChange={handleCountryChange}
        countries={countries}
        cities={cities}
        states={states}
        loading={loading}
        setIsEditable={setIsEditable}
        isEditable={isEditable}
        isTopHeader={true}
        shippingDetailFormik={shippingDetailFormik}
        onSave={() => {
          shippingDetailFormik?.handleSubmit();
          // router.push("/shipping");
        }}
      />
    );
  };

  return (
    <main>
      {isInitializing ? (
        <Container fluid>
          <Row>
            <Col className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading checkout...</p>
            </Col>
          </Row>
        </Container>
      ) : orderPlaced ? (
        <Container fluid>
          <Row>{OrderPlaced()}</Row>
        </Container>
      ) : (
        <>
          <div className={classes.heroSecColor}>
            <Container>
              <Row>
                <Col md={12} className="p-0">
                  <HeroSection
                    isColor={true}
                    data={cmsData?.heroSection}
                    styles={{
                      colorText: classes.colorTextClass,
                      colorHeading: classes.colorHeadingClass,
                      colorDiv: classes.colorDivClass,
                    }}
                    descriptionClass={classes.descriptionClass}
                    mainDivClass={classes.mainDivClass}
                    colorDiv={classes.colorDivClass}
                  />
                </Col>
              </Row>
            </Container>
          </div>
          <div className={classes.mainDiv}>
            <Container>
              <Row className={`${classes.customRow}`}>
                <>
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    xl={8}
                    className={isMobile ? "mb-0" : "mb-5"}
                  >
                    {!isMobile768 ? (
                      <Table
                        headings={tableHeader}
                        tableData={tableBody}
                        tableHead={classes.tableHeadClass}
                        tableBodyClass={classes.tableBodyClass}
                        noteIndex={noteIndex}
                        addNote={addNote}
                        setAddNote={setAddNote}
                        custTableClass={classes.custTableClass}
                      />
                    ) : (
                      <div className={classes.cardDiv}>
                        <CheckoutCard
                          tableData={data}
                          noteIndex={noteIndex}
                          addNote={addNote}
                          setAddNote={setAddNote}
                          handleAddNote={handleAddNote}
                          updateNoteInCart={updateNoteInCart}
                        />
                      </div>
                    )}
                  </Col>
                  <Col
                    md={12}
                    lg={12}
                    xl={4}
                    className={isMobile768 ? "mb-0" : "mb-5"}
                  >
                    {renderOrderSummery()}
                  </Col>

                  {/* <Col
                    xl={8}
                    lg={12}
                    md={12}
                    className={isMobile768 ? "mt-0" : "mt-4"}
                  >
                    {isMobile768 ? renderOrderSummery() : renderShipping()}
                  </Col> */}
                </>
              </Row>
            </Container>
          </div>
        </>
      )}

      <Container>
        <Row className="g-0">
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementLeft)}>
              <AnnouncementCard data={cmsData?.announcement1} />
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementRight)}>
              <AnnouncementCard
                data={cmsData?.announcement2}
                placeholder="Email address"
                hasNewsletter={true}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
