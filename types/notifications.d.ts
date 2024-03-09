export type TNotification = {
  _id: string;
  subject: string;
  message: string;
  french_message: string;
  notification_type: number;
  status: boolean;
  reciver_id: string;
  createdAt: Date;
};

export type TNotifications = TNotification[];
