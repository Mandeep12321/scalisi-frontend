import SearchPageView from "@/components/template/SearchPageView";
import { getApi } from "@/interceptor/server-side-getApi";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
    const [cmsSupportData, cmsUpdateData] = await Promise.allSettled([
        getApi(`cms/public/page/supportPage`),
        getApi(`cms/public/page/updatesPage`),
    ]);

    return (
        <Suspense>
            <SearchPageView
                cmsSupportData={cmsSupportData?.value?.data}
                cmsUpdateData={cmsUpdateData?.value?.data}
            />
        </Suspense>
    );
}
