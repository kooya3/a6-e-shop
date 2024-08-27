export interface MutatePesapal {
  id: string;
  currency: string;
  amount: number;
  description: string;
  callback_url: string;
  redirect_mode?: string;
  cancellation_url?: string;
  notification_id: string;
  branch?: string;
  billing_address: BillingAddress;
}

export interface BillingAddress {
  email_address?: string;
  phone_number: string;
  country_code?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  line_1?: string;
  line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  zip_code?: string;
}
