import { ImageSourcePropType } from "react-native";

export interface movieTypes {
  id: number;
  backdrop_path: ImageSourcePropType;
  poster_path: string;
  title?: string;
  overview: string;
  vote_average: number;
  name?: string;
}
export interface Genre {
  id: number;
  name: string;
}
