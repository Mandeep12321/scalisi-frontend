import LandingPageView from "@/components/template/LandingPageView/LandingPageView";
import { getApi } from "@/interceptor/server-side-getApi";

export default async function Home() {
  const data = await getApi(`cms/public/page/homePage`);

  return <LandingPageView cmsData={data?.data} />;
}
