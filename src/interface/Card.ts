export type ButtonType = "submit" | "reset" | "button";

export interface CardInterface {
  artistName: string;
  trackName: string;
  primaryGenreName: string;
  collectionViewUrl: string;
  artworkUrl100: string;
  collectionPrice: string;
  onClick: () => void;
}
