import DistributionMapView from "@/components/template/DistributionMapView";
import { getApi } from "@/interceptor/server-side-getApi";

export const dynamic = "force-dynamic";

export default async function page() {
  const cmsData = await getApi(`cms/public/page/distributionMapPage`);
  return <DistributionMapView cmsData={cmsData?.data} />;
}
