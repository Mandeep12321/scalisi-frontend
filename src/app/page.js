import LandingPageView from "@/components/template/LandingPageView/LandingPageView";
import { getApi } from "@/interceptor/server-side-getApi";
import { Suspense } from "react";

export default async function Home() {
  const data = await getApi(`cms/public/page/homePage`);

  return (
    <Suspense>
      <LandingPageView cmsData={data?.data} />
    </Suspense>
  );
}
