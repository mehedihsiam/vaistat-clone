import {TAuth} from './auth';
import {TDriverReport} from './driverReport';

export type LoggedOutStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  PhoneVerification: undefined;
  Otp: undefined;
  DocumentUpload: {
    auth: TAuth;
  };
  SignUpExtraInfo: undefined;
  OnBoarding: {
    auth: TAuth;
  };
  LicenseDetails: undefined;
};
export type LoggedInStackParamList = {
  HomeStack: undefined;
  Setting: undefined;
  ChangePassword: undefined;
  NotificationSettings: undefined;
  AppNotification: undefined;
  EmailNotification: undefined;
  PushNotification: undefined;
  DeleteAccount: undefined;
  ConfirmDeleteAccount: undefined;
  SessionsSummary: undefined;
  Notification: undefined;
  Profile: undefined;
  ScanBarcode: undefined;
  ScanQrCode: undefined;
  JobDetails: undefined;
  ReadyDelivery: {
    job_id: string;
    stopLoading?: boolean;
    hideFooter?: boolean;
  };
  OrderDelivery: {
    job_id: string;
    collectedAmount: number;
    customer_name?: string;
  };
  AddSignature: undefined;
  NotDelivered: {
    job_id: string;
  };
  ReportView: {
    report: TDriverReport;
  };
  EditProfile: undefined;
  ChatExport: undefined;
  PaymentHistory: undefined;
  ProfileReports: undefined;
  Payment: {
    collectableAmount: number;
    job_id: string;
  };
  Chat: undefined;
  AvailableDrivers: {
    job_id: string;
  };
  TransferredJob: {
    job_id: string;
  };
};
export type HomeStackParamList = {
  Home: {
    destination?: {
      latitude: number;
      longitude: number;
    };
  };
  AcceptedJobs: undefined;
  ActiveJobs: undefined;

  TaskJobs: undefined;
  TakeOwnershipByQrCode: {
    job_id: string;
  };
  UpcomingJobs: undefined;
  UrgentJobs: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  TermsAndConditions: undefined;
  Faq: undefined;

  MainApp: undefined;
};
