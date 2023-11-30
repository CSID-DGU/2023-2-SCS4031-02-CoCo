export interface FollowModalProps {
  followerList: follow[];
  followingList: follow[];
  setOpened: () => void;
  tab: tab;
}

export interface follow {
  accountId: string;
  profileImage: string;
  nickname: string;
}

interface tab {
  name: string;
}