import AboutUsPageView from "@/components/template/AboutUsPageView";
import { getApi } from "@/interceptor/server-side-getApi";
import React from "react";

export const dynamic = "force-dynamic";

export default async function AboutUsPage() {
  const cmsData = await getApi(`cms/public/page/aboutUsPage`);
  return <AboutUsPageView cmsData={cmsData?.data} />;
}
