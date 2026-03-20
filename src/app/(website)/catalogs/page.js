import UnderWorkingPageTemplate from "@/components/template/UnderWorkingPageTemplate/UnderWorkingPageTemplate";

export default async function CatalogPage() {
  // const cmsData = await getApi(`cms/public/page/catalogPage`);
  // return <CatalogView cmsData={cmsData?.data} />;
  return (
    <UnderWorkingPageTemplate
      title="Under Maintenance"
      description="We are currently working on this page. Please check back later."
    />
  );
}
