export interface BCItem {
  "@odata.context": string;
  value: Value[];
}

export interface Value {
  "@odata.etag": string;
  No: string;
  Item_Category_Code: string;
  Product_Model: string;
  Description: string;
  Unit_Price: number;
  Item_Disc_Group: string;
  VAT_Prod_Posting_Group: string;
  Inventory: number;
  Gen_Prod_Posting_Group: string;
  Global_Dimension_1_Filter: string;
  Global_Dimension_2_Filter: string;
  Location_Filter: string;
  Drop_Shipment_Filter: string;
  Variant_Filter: string;
  Lot_No_Filter: string;
  Serial_No_Filter: string;
  Unit_of_Measure_Filter: string;
}
