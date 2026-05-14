import SearchPageView from "@/components/template/SearchPageView";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function SearchPage() {
    return (
        <Suspense>
            <SearchPageView />
        </Suspense>
    );
}
