"use client";

import UnderWorkingPageTemplate from "@/components/template/UnderWorkingPageTemplate/UnderWorkingPageTemplate";
import Cookies from "js-cookie";

export default async function MyOrdersPage() {
  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  return (
    <UnderWorkingPageTemplate
      title={isSpanish ? "Información del pedido" : "Order Information"}
      description={
        isSpanish
          ? "Para cualquier pedido activo, contáctenos por correo electrónico"
          : "For any active orders, please contact us via email."
      }
      email={"info@scaliciproducts.com"}
      descriptionSuffix={!isSpanish && " to check your order status."}
      isWorking={false}
    />
  );
}
