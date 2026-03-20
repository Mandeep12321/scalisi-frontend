"use client";

import UnderWorkingPageTemplate from "@/components/template/UnderWorkingPageTemplate/UnderWorkingPageTemplate";
import Cookies from "js-cookie";

export default async function PrivacyPage() {
  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  return (
    <UnderWorkingPageTemplate
      title={isSpanish ? "En mantenimiento" : "Under Maintenance"}
      description={
        isSpanish
          ? "Esta página se encuentra actualmente en mantenimiento y estará disponible próximamente. Si necesita ayuda o tiene alguna pregunta, contáctenos en"
          : "This page is currently under maintenance and will be available soon. If you need assistance or have questions, please contact us at"
      }
      email={"info@scaliciproducts.com"}
      descriptionSuffix={
        !isSpanish && " Thank you for your patience and understanding."
      }
      isWorking={false}
    />
  );
}
