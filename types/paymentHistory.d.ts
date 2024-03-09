export type TJobIdStepperStatus = {
  _id: string;
  status_type: string;
  status_name_en: string;
  status_name_fr: string;
  dateTime: string;
};
export type TPaymentJobID = {
  _id: string;
  pick_up_location: string;
  drop_off_location: string;
  ride_fare_without_tax: number;
  stepper_status: TJobIdStepperStatus[];
};

export type TPaymentHistoryData = {
  _id: string;
  payment_for: string;
  payment_method: string;
  cash_amount: number;
  cheque_amount: number;
  cheque_img: string;
  currency: string;
  settled: boolean;
  paid: boolean;
  pay_status: string;
  job_id: TPaymentJobID;
  driver_id: string;
  pharmacy_id: string;
  createdAt: Date;
};

export type TPaymentHistory = {
  code: number;
  jobTotalCount: number;
  message: string;
  result: Array<TPaymentHistoryData>;
  totalAmount: string;
};
