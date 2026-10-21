export type Genre = "Romance" | "Drama" | "Action" | "Mystery" | "Fantasy";

export interface CastMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Episode {
  id: string;
  seriesId: string;
  number: number;
  title: string;
  durationSec: number;
  thumbnail: string;
  videoUrl: string | number;
  coinCost: number;
}

export interface Series {
  id: string;
  title: string;
  tagline: string;
  poster: string;
  genres: Genre[];
  tags: string[];
  rating: number;
  ratingCount: number;
  year: number;
  episodeCount: number;
  minutesPerEpisode: number;
  isPro: boolean;
  freeEpisodes: number;
  synopsis: string;
  highlights: string[];
  cast: CastMember[];
  likes: number;
  comments: number;
}

export interface HomeRail {
  id: string;
  title: string;
  seriesIds: string[];
}

export interface HomeCategory {
  id: string;
  title: string;
  highlighted?: boolean;
  rails: HomeRail[];
}

export interface CoinPack {
  id: string;
  coins: number;
  bonus: number;
  price: string;
  tag?: "popular" | "best";
}

export type LibraryStatus = "new" | "completed" | "locked";

export interface LibraryItem {
  seriesId: string;
  currentEpisode: number;
  status?: LibraryStatus;
  subGenre: string;
  purchased: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
}

export interface FeedItem {
  key: string;
  series: Series;
  episode: Episode;
}

export type UnlockMethod = "episode" | "season" | "vip" | "ad";
