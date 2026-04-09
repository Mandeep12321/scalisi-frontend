export const formatProducts = (data = [], isLoggedIn = false, type = "") => {
  return data.map((item) => ({
    itemid: item.ERP_ID ?? item.itemid,
    description: item.ERP_ItemDesc ?? item.description,

    // ✅ Conditional uoms
    uoms: isLoggedIn
      ? item?.uoms || [] // 🔥 keep original API uoms
      : [
          {
            itemid: item.ERP_ID ?? item.itemid,
            erp_uom: item.ERP_UOM,
            description: item.ERP_ItemDesc,
            price: null,
            note: null,
            ERP_ConvFactor: 1,
            packsize: "",
            CanOrder: false,
            catchweight: false,
          },
        ],

    AdvancePurchaseDays: null,
    category: item.ERP_Category || item.category,
    mastercategory: item.master_category,

    // ✅ image (unchanged)
    image: item.imagename,
    fullimagepath:
      type === "orderGuide" || !isLoggedIn
        ? `https://jackscalisi.webfss.com/img/itemimages/${item.imagename}`
        : item.fullimagepath,
  }));
};