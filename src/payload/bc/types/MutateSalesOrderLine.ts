export interface MutateSalesOrderLine {
  Type: string;
  Document_No: string;
  No: string;
  Location_Code?: string;
  ShortcutDimCode4: string;
  Quantity: number;
  Invoice_Discount_Percent?: number;
}
