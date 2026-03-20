import ProductDetailView from "@/components/template/ProductDetailView/ProductDetailView";
import { getApi } from "@/interceptor/server-side-getApi";

export default async function ProductsDetailPage() {
  const [cmsSupportData, cmsUpdateData] = await Promise.allSettled([
    getApi(`cms/public/page/supportPage`),
    getApi(`cms/public/page/updatesPage`),
  ]);

  return (
    <ProductDetailView
      cmsSupportData={cmsSupportData}
      cmsUpdateData={cmsUpdateData}
    />
  );
}
