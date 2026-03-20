import VendorPageView from "@/components/template/VendorPageView";
import { getApi } from "@/interceptor/server-side-getApi";
import React from "react";

export const dynamic = "force-dynamic";

export default async function VendorPage() {
  const cmsData = await getApi(`cms/public/page/vendorPage`);
  return <VendorPageView cmsData={cmsData?.data} />;
}
