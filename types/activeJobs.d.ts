import {TTiming} from './time';

export type TJobTag = {
  _id: string;
  tag_type: string;
  tag_code: string;
  tag_for: string;
  tag_for_french: string;
  default_key: string;
  running: boolean;
  running1: boolean;
  tag_image: string;
};

export type TPackage = {
  package: string;
  small: string;
  large: string;
  extraLarge: string;
  label: string;
  weight: string;
};

export type TJobTimingObject = {
  type: string;
  startTime: TTiming;
  endTime: TTiming;
  nameEn: string;
  nameFr: string;
  startDateTime: Date;
};

export type TJobUser = {
  _id: string;
  profile_img: string;
  pharmacy_name: string;
  mobile_no: string;
  country_code: string;
};

export type TActiveJob = {
  _id: string;
  booking_code: string;
  pick_up_location: string;
  drop_off_location: string;
  pickup_lat_long: number[];
  dropoff_lat_long: number[];
  transfer_driver_lat_long: number[];
  transfer_driver_location: string;
  note: string;
  customer_name: string;
  customer_f_name: string;
  customer_l_name: string;
  customer_phone: string;
  customer_country_code: string;
  customer_email: string;
  customer_address: string;
  customer_appartment: string;
  customer_door_code: string;
  delivery_type: '0' | '1' | '2';
  estimate_distance: number;
  customer_type: '0' | '1' | '2';
  isExpired: boolean;
  pickedUp: boolean;
  startDropup: boolean;
  isAccepted: boolean;
  pick_up_note: string;
  dropoff_note: string;
  ride_fare: number;
  ride_fare_without_tax: number;
  job_amount: number;
  collected_amount: number;
  collected_amount_note: string;
  night_charge: number;
  weekend_charge: number;
  taxes: number;
  tax: number;
  gst: number;
  qst: number;
  processingFee: number;
  stripeFee: number;
  isTransferred: boolean;
  pharamcy_payment: boolean;
  customer_payment: boolean;
  job_tags: TJobTag[];
  other_fare: number;
  user_id: TJobUser;
  job_date: Date;
  packageObj: TPackage;
  jobTimingObj: TJobTimingObject;
};
