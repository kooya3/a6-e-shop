export interface PesapalTransactionStatus {
  payment_method: string;
  amount: number;
  created_date: Date;
  confirmation_code: string;
  payment_status_description: (keyof typeof PaymentStatus);
  description: string;
  message: string;
  payment_account: string;
  call_back_url: string;
  status_code: (typeof PaymentStatus)[keyof typeof PaymentStatus];
  merchant_reference: string;
  payment_status_code: string;
  currency: string;
  error: Error;
  status: string;
}

export interface Error {
  error_type: null;
  code: null;
  message: null;
  call_back_url: null;
}

export const PaymentStatus = {
  INVALID: 0,
  COMPLETED: 1,
  FAILED: 2,
  REVERSED: 3,
} as const
