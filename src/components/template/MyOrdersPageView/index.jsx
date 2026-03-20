"use client";
import { Button } from "@/components/atoms/Button";
import OrderCard from "@/components/atoms/OrderCard/OrderCard";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import DropDown from "@/components/molecules/DropDown/DropDown";
import HeroSection from "@/components/molecules/HeroSection";
import Table from "@/components/organisms/Table";
import {
  MONTHS_DROPDOWN,
  YEARS_DROPDOWN,
} from "@/developmentContent/dropdown-options";
import { MY_ORDERS_PAGE_DATA } from "@/developmentContent/mock-data";
import OrderDetailsModal from "@/modals/OrderDetailsModal";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { getFormattedPrice, mergeClass } from "@/resources/utils/helper";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaEye, FaFilter, FaReceipt } from "react-icons/fa";
import classes from "./MyOrdersPageView.module.css";

export default function MyOrdersPageView({ cmsData }) {
  const [data, setData] = useState(MY_ORDERS_PAGE_DATA || []);
  const _cmsData = cmsData;
  const [loading, setLoading] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobile768, setIsMobile768] = useState(false);

  useEffect(() => {
    isMobileViewHook(setIsMobile, 376);
    isMobileViewHook(setIsMobile768, 769);
  });

  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    month: MONTHS_DROPDOWN?.[0],
    year: YEARS_DROPDOWN?.[0],
  });

  const headings = [
    {
      id: "orderNumber",
      label: "Order Number",
      style: { width: "14%" },
      className: classes.tableHeadings,
    },
    {
      id: "dateOrdered",
      label: "Date Ordered",
      style: { width: "14%" },
      className: classes.tableHeadings,
    },
    {
      id: "dateDelivery",
      label: "Date of Delivery",
      style: { width: "15%" },
      className: classes.tableHeadings,
    },
    {
      id: "quantity",
      label: "Quantity",
      style: { width: "10%" },
      className: mergeClass(classes.tableHeadings, classes.productPercent10),
    },
    {
      id: "products",
      label: "Products",
      style: { width: "22%" },
      className: mergeClass(classes.tableHeadings, classes.productPercent20),
      renderValue: (item, index) => (
        <div className={classes.productDetails}>
          <p className="maxLine2">{item.products}</p>
          <button
            className={classes.viewAllButton}
            onClick={() => {
              let selectedData = data?.tableData?.find(
                (e) => e?._id === item?._id
              );
              setSelectedItem(selectedData);

              setShowProductModal(!showProductModal);
            }}
          >
            <FaEye className={classes.orderReceiptText} /> View all
          </button>
        </div>
      ),
    },
    {
      id: "total",
      label: "Total",
      style: { width: "9%" },
      className: classes.tableHeadings,
    },
    {
      id: "actions",
      style: { width: "13%" },
      className: classes.tableHeadings,
      renderValue: (item) => (
        <Button
          className={classes.actionButton}
          variant="borderRed"
          label="Order Receipt"
          leftIcon={<FaReceipt size={22} />}
          onClick={() => alert(`Order details for ${item?.orderNumber}`)}
        />
      ),
    },
  ];

  const tableBody = data?.tableData?.map((e) => ({
    orderNumber: e?.orderNumber,
    dateOrdered: e?.dateOrdered,
    dateDelivery: e?.dateDelivery,
    quantity: e?.quantity,
    products: e?.products,
    total: getFormattedPrice(e?.total),
    _id: e?._id,
  }));

  const resetFilters = () => {
    setSelectedFilters({
      month: MONTHS_DROPDOWN?.[0],
      year: YEARS_DROPDOWN?.[0],
    });
  };

  let ProductSummaryHeadings = [
    {
      id: "products",
      label: "Products",
      style: { width: "55%", textAlign: "left" },
      className: mergeClass(
        "fs-18",
        classes.tableHeadings,
        classes.productPercent20
      ),
      renderValue: (item, index) => (
        <div
          className={`${classes.productDetails} ${classes.productDetailsDesc}`}
        >
          <p className="maxLine2">{item?.products}</p>
        </div>
      ),
    },

    {
      id: "quantity",
      label: "Quantity",
      style: { width: "20%", paddingLeft: "20px" },
      className: mergeClass(
        "fs-18",
        classes.tableHeadings,
        classes.productPercent10
      ),
      renderValue: (item, index) => (
        <div className={classes.productDetails}>
          <p className="maxLine2">{item.quantity}</p>
        </div>
      ),
    },

    {
      id: "subTotal",
      label: "Sub Total",
      style: { width: "25%", paddingLeft: "20px" },
      className: mergeClass("fs-18", classes.tableHeadings),
      renderValue: (item, index) => (
        <div className={classes.productDetails}>
          <p className="maxLine2">{item.subTotal}</p>
        </div>
      ),
    },
  ];

  const orderProductData = selectedItem?.productLists?.map((e) => ({
    products: e?.products,
    quantity: e?.quantity,
    subTotal: getFormattedPrice(e?.total),
  }));

  // modal data heading , body
  const selectedItemHeadings = [
    {
      id: "orderNumber",
      label: "Order Number",
      style: { width: "18%" },
      className: mergeClass("fs-18", classes.tableHeadings),
    },
    {
      id: "dateOrdered",
      label: "Date Ordered",
      style: { width: "20%" },
      className: mergeClass("fs-18", classes.tableHeadings),
    },
    {
      id: "dateDelivery",
      label: "Date of Delivery",
      style: { width: "20%" },
      className: mergeClass("fs-18", classes.tableHeadings),
    },
    {
      id: "quantity",
      label: "Quantity",
      style: { width: "10%" },
      className: mergeClass(
        "fs-18",
        classes.tableHeadings,
        classes.productPercent10
      ),
    },
    {
      id: "total",
      label: "Total",
      style: { width: "12%" },
      className: mergeClass("fs-18", classes.tableHeadings),
    },
    {
      id: "actions",
      style: { width: "20%", textAlign: "right" },
      className: mergeClass("fs-18", classes.tableHeadings),
      renderValue: (item) => (
        <Button
          className={mergeClass("fw-700 fs-15", classes.actionButton)}
          variant="borderRed"
          label="Order Receipt"
          leftIcon={<FaReceipt />}
          onClick={() => alert(`Order details for ${item?.orderNumber}`)}
        />
      ),
    },
  ];

  const orderTableData = [selectedItem]?.map((e) => ({
    orderNumber: e?.orderNumber,
    dateOrdered: e?.dateOrdered,
    dateDelivery: e?.dateDelivery,
    products: e?.products,
    quantity: e?.quantity,
    total: getFormattedPrice(e?.total),
  }));

  return (
    <main>
      <style>
        {`
            
          .table100-body {
            height: calc(100vh - 360px);
            overflow: scroll !important;
          }
         
          @media screen and (max-width: 1440px) {
            .table100-head,
            .table100-body {
              width: 1200px;
            }
            .table100.ver1 {
              overflow-x: scroll !important;
            }
          }
        
            `}
      </style>
      <div className={classes.heroSecColor}>
        <Container>
          <Row>
            <Col md={12} className="p-0">
              <HeroSection
                isColor={true}
                data={_cmsData?.hero}
                mainDivClass={classes.mainDivClass}
                styles={{
                  colorText: classes.colorTextClass,
                  colorHeading: classes.colorHeadingClass,
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md={12}>
            <div className={classes.filterSection}>
              {!isMobile768 && (
                <p className={classes.title}>Showing 6 orders</p>
              )}

              <div className={classes.filterContainer}>
                <div className={classes.filterText}>
                  <FaFilter size={17} className={classes.filterIcon} />
                  <p>Filter</p>
                </div>
                <span
                  className={mergeClass(classes.yearDropDown, classes.month)}
                >
                  <p>Month</p>
                  <DropDown
                    customStyle={{
                      fontWeight: "700",
                      height: "45px",
                      border: "2px solid #8E8E8E !important",
                      width: "148px",
                    }}
                    dropDownContainer={classes.dropDownContainer}
                    value={selectedFilters.month}
                    setValue={setSelectedFilters}
                    options={MONTHS_DROPDOWN}
                  />
                </span>

                <span
                  className={mergeClass(classes.yearDropDown, classes.year)}
                >
                  <p>Year</p>
                  <DropDown
                    customStyle={{
                      fontWeight: "700",
                      height: "45px",
                      border: "2px solid #8E8E8E",
                      width: "96px",
                    }}
                    dropDownContainer={classes.dropDownContainerTwo}
                    value={selectedFilters.year}
                    setValue={setSelectedFilters}
                    options={YEARS_DROPDOWN}
                  />
                </span>
                {!isMobile768 && (
                  <div className={classes.showAll} onClick={resetFilters}>
                    Show All
                  </div>
                )}
              </div>
              {isMobile768 && (
                <div className={classes.showDiv}>
                  <div className={classes.showAll} onClick={resetFilters}>
                    Show All
                  </div>
                  <p className={classes.title}>Showing 6 orders</p>
                </div>
              )}
            </div>
          </Col>

          <Col md={12}>
            {!isMobile768 ? (
              <div className={classes.tableDiv}>
                <Table
                  tableData={tableBody}
                  loading={false}
                  headings={headings}
                  tableBodyClass={classes.minTableBody}
                  custTableClass={classes.customTableClass}
                />
              </div>
            ) : (
              <div className={classes.orders}>
                <Row>
                  {tableBody?.length > 0 &&
                    tableBody?.map((item) => {
                      return (
                        <Col sm="6" lg="4">
                          <OrderCard
                            item={item}
                            data={data}
                            key={item?._id}
                            showProductModal={showProductModal}
                            setShowProductModal={setShowProductModal}
                            setSelectedItem={setSelectedItem}
                          />
                        </Col>
                      );
                    })}
                </Row>
              </div>
            )}
          </Col>
        </Row>
        <Row className="g-0">
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementLeft)}>
              <AnnouncementCard data={_cmsData?.support} />
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementRight)}>
              <AnnouncementCard
                data={_cmsData?.updates}
                placeholder="Email address"
                hasNewsletter={true}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {showProductModal && (
        <OrderDetailsModal
          show={showProductModal}
          setShow={setShowProductModal}
          orderProductData={orderProductData}
          ProductSummaryHeadings={ProductSummaryHeadings}
          loading={loading === "orderDetails"}
          data={selectedItem}
          selectedItemHeadings={selectedItemHeadings}
          orderTableData={orderTableData}
          width={"500"}
        />
      )}
    </main>
  );
}
