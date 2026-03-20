"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import UnderWorkingPageTemplate from "@/components/template/UnderWorkingPageTemplate/UnderWorkingPageTemplate";

export default function OrderGuidePage() {
  const router = useRouter();
  const { isLogin } = useSelector((state) => state?.authReducer);

  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const handleLoginClick = () => {
    router.push("/login?redirect=/order-guide");
  };

  return (
    <UnderWorkingPageTemplate
      title={
        isLogin
          ? isSpanish
            ? "En Desarrollo"
            : "Thank you for your order"
          : isSpanish
          ? "Guía de Pedidos"
          : "Order Guide"
      }
      description={
        isLogin
          ? isSpanish
            ? "Nuestro equipo está trabajando en esta página. Para obtener ayuda con su pedido, póngase en contacto con nuestro administrador en"
            : "For order updates from Scalisi, please contact us via email"
          : isSpanish
          ? "Por favor, inicie sesión para recibir actualizaciones sobre su pedido."
          : "Please login for updates on your order."
      }
      email={isLogin ? "info@scaliciproducts.com" : null}
      descriptionSuffix={isLogin && !isSpanish ? ". Thanks!" : null}
      showLoginButton={!isLogin}
      onLoginClick={handleLoginClick}
      isWorking={false}
    />
  );
}
