
export type ProfileImageProps = {
  src: any;
  type: string; // small, medium, large
  isMe?: boolean;
  margin?: string;
  previewURL?: string;
  setPreviewURL?: (previewURL: string) => void;
};