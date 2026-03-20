import ContactPageView from "@/components/template/ContactPageView";
import { getApi } from "@/interceptor/server-side-getApi";

export const dynamic = "force-dynamic";

export default async function page() {
  const cmsData = await getApi(`cms/public/page/contactPage`);
  return <ContactPageView cmsData={cmsData?.data} />;
}
