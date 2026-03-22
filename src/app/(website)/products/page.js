import ProductsPageView from "@/components/template/ProductsPageView";
import { getApi } from "@/interceptor/server-side-getApi";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const data = "";
  const cmsData = await getApi(`cms/public/page/productsPage`);

  console.log(cmsData);

  return <ProductsPageView cmsData={cmsData?.data} />;
}
