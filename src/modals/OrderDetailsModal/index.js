"use client";
import Table from "@/components/organisms/Table";
import { mergeClass } from "@/resources/utils/helper";
import { Col, Container, Row } from "react-bootstrap";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./orderDetailsModal.module.css";

const OrderDetailsModal = ({
  show = false,
  setShow = () => {},
  ProductSummaryHeadings,
  selectedItemHeadings,
  orderProductData,
  orderTableData,
}) => {
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        modalStyles={classes.modal}
        size="xl"
        showCloseIcon={true}
        modalClass={classes.modalClass}
      >
        <Row>
          <Col md={12}>
            <Table
              headings={ProductSummaryHeadings}
              tableData={orderProductData}
              tableHeaderDiv={classes.tableHeaderClass}
              tableHead={mergeClass("fs-20 fw-700", classes.tableHeadStyle)}
              tableBodyClass={mergeClass(
                "maxLine1 fs-20 fw-500",
                classes.tableBodyClass
              )}
              custTableClass={classes.customTableClass}
            />
          </Col>

          <Col md={12} className={`${classes.orderRecieipt}`}>
            <Table
              tableData={orderTableData}
              tableHeaderDiv={mergeClass(
                classes.tableHeaderClass,
                classes.secondTableHeaderClass
              )}
              headings={selectedItemHeadings}
              tableHead={mergeClass("fs-20", classes.orderSummaryHead)}
              tableBodyClass={mergeClass("fs-16", classes.orderSummary)}
              tableBorderClass={classes.tableBorderClass}
              custTableClass={classes.customTableClass}
            />
          </Col>
        </Row>
      </ModalSkeleton>
    </>
  );
};

export default OrderDetailsModal;
