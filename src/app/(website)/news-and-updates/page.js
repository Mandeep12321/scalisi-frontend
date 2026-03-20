import BlogsView from "@/components/template/BlogsView/BlogsView";
import { getApi } from "@/interceptor/server-side-getApi";

export const dynamic = "force-dynamic";
export default async function NewsAndUpdatedPage() {
  const cmsData = await getApi(`cms/public/page/newsAndUpdatesPage`);
  return <BlogsView cmsData={cmsData?.data} />;
}
