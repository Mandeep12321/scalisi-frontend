"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import UnderWorkingPageTemplate from "@/components/template/UnderWorkingPageTemplate/UnderWorkingPageTemplate";

export default function MyInvoicesPage() {
  const router = useRouter();
  const { isLogin } = useSelector((state) => state?.authReducer);

  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const handleLoginClick = () => {
    router.push("/login?redirect=/my-invoices");
  };

  return (
    <UnderWorkingPageTemplate
      title={
        isLogin
          ? isSpanish
            ? "En Desarrollo"
            : "Invoice Information"
          : isSpanish
          ? "Mis Facturas"
          : "My Invoices"
      }
      description={
        isLogin
          ? isSpanish
            ? "Nuestro equipo está trabajando en esta página. Para obtener ayuda con sus facturas, póngase en contacto con nuestro administrador en"
            : "For invoice updates from Scalisi, please contact us via email"
          : isSpanish
          ? "Por favor, inicie sesión para recibir actualizaciones sobre sus facturas."
          : "Please login for updates on your invoices."
      }
      email={isLogin ? "info@scaliciproducts.com" : null}
      descriptionSuffix={isLogin && !isSpanish ? ". Thanks!" : null}
      showLoginButton={!isLogin}
      onLoginClick={handleLoginClick}
      isWorking={false}
    />
  );
}
