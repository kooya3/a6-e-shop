export interface SubmitOrderResquest {
  order_tracking_id: string;
  merchant_reference: string;
  redirect_url: string;
  error: number | null;
  status: string;
}
