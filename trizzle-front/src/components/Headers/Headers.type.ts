export type HeadersProps = {
  isHome?: boolean;
  isMessage?: string;
  isRegistrationId?: string;
  isToken?: string;
};

export type NotiProps = {
  notiList : Notification[];
}

export type Notification = {
  user : any;
  content : string;
  contentId : string;
  notificationRegistrationDate : string;
  notificationType : string;
  count : number;
};