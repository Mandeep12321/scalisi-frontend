export const formatProducts = (data = []) => {
  return data.map((item) => ({
    itemid: item.ERP_ID,
    description: item.ERP_ItemDesc,

    // keep same structure (uoms array)
    uoms: [
      {
        itemid: item.ERP_ID,
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
    category: item.ERP_Category,
    mastercategory: item.master_category,

    // ✅ EXACT same image logic (unchanged)
    image: item.imagename,
    fullimagepath: `https://jackscalisi.webfss.com/img/itemimages/${item.imagename}`,
  }));
};