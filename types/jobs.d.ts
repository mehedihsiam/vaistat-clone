export type TJobTag = {
  backgroundColor: string;
  tag: string;
};

export type TJobTiming = {
  startTime: {
    hour: string;
    minute: string;
  };
  endTime: {
    hour: string;
    minute: string;
  };
  type: string;
  nameEn: string;
  nameFr: string;
  startDateTime: string | null;
  endDateTime: string | null;
};

export type TUpcomingJob = {
  _id: string;
  job_type: string;
  jobTimingObj: TJobTiming;
  booking_code: string;
  drop_off_location: string;
  pick_up_location: string;
  pickup_lat_long: number[];
  dropoff_lat_long: number[];
  customer_f_name: string;
  customer_l_name: string;
  customer_phone: string;
  customer_country_code: string;
  customer_email: string;
  estimate_distance: number;
  delivery_type: string;
  customer_type: string;
  job_amount: number;
  job_date: string;
  isAccepted: boolean;
  jobFor: string;
};

export type TJobBusiness = {
  id: string;
  name: string;
  location: string;
  logo: string;
  phoneNumber: string;
  code: string;
  pickUpAmount: number;
  deliveryAmount: number;
};

export type TSingleJobPharmacy = {
  business: TJobBusiness;
  jobs: TUpcomingJob[];
};

export type TJobsPharmacyList = TSingleJobPharmacy[];
