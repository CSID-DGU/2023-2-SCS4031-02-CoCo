
export type ProfileImageProps = {
  src?: string;
  type: string; // small, medium, large
  isMe?: boolean;
  margin?: string;
  previewURL?: string;
  setPreviewURL?: (previewURL: string) => void;
};