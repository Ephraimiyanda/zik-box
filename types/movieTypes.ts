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
export interface videos {
  id: string;
  official: boolean;
  name: string;
  key: string;
}
export interface cast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}
export interface review {
  id: string;
  author: string;
  author_details: {
    name: string;
    avatar_path: string | null;
    rating: number;
  };
  content: string;
}
export interface tmdbData {
  budget: number;
  genres: Genre[];
  videos: videos[];
  recommendations: movieTypes[];
  cast: cast[];
  reviews: review[];
  id: number;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number;
  tagline: string;
  status: string;
  vote_average: number;
}
