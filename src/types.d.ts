declare global {
  interface Window {
    _fetch: typeof fetch;
    isPopupOpen: boolean;
    imageId?: string;
  }
}

export interface Label {
  ko: string;
  en: string;
  ja?: any;
  vn: string;
}

export interface Dimension {
  width?: any;
  height?: any;
}

export interface Trimmed {
  filename?: any;
  width?: any;
  height?: any;
}

export interface ProfileImage {
  id: string;
  name: string;
  label: Label;
  filename: string;
  imageType: string;
  dimension: Dimension;
  trimmed: Trimmed;
}

export interface Status {
  following: number;
  follower: number;
}

export interface User {
  id: string;
  nickname: string;
  username: string;
  profileImage: ProfileImage;
  status: Status;
  description?: any;
  role: string;
}

export interface Label2 {
  ko: string;
  en: string;
  ja?: any;
  vn: string;
}

export interface Dimension2 {
  width?: any;
  height?: any;
}

export interface Trimmed2 {
  filename?: any;
  width?: any;
  height?: any;
}

export interface Sticker {
  id: string;
  name: string;
  label: Label2;
  filename: string;
  imageType: string;
  dimension: Dimension2;
  trimmed: Trimmed2;
}

export interface EntryStory {
  id: string;
  content: string;
  created: Date;
  commentsLength: number;
  likesLength: number;
  user: User;
  image?: any;
  sticker: Sticker;
  isLike: boolean;
}

export interface ImageData {
  id: string;
  name: string;
  origName: string;
  ext: string;
}
