import BlogsDetailView from "@/components/template/BlogsDetailView";
import { getApi } from "@/interceptor/server-side-getApi";

export const dynamic = "force-dynamic";

export default async function BlogDetail() {
  const [cmsSupportData, cmsUpdateData] = await Promise.allSettled([
    getApi(`cms/public/page/supportPage`),
    getApi(`cms/public/page/updatesPage`),
  ]);
  return (
    <BlogsDetailView
      cmsSupportData={cmsSupportData}
      cmsUpdateData={cmsUpdateData}
    />
  );
}
