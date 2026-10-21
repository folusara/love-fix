import { Episode, Series } from "@/types";

/**
 * Playable sources, in priority order.
 *
 * 1. BUNDLED: drop MP4s into /assets/videos and list them here. Zero network risk; use these for the demo.
 * 2. REMOTE: public CC-licensed test streams (Blender open movies). Direct MP4/HLS only, so no YouTube links.
 *
 * Google's gtv-videos-bucket samples were removed: that bucket now returns 403 Forbidden.
 */
const BUNDLED_VIDEOS: number[] = [
  // require('@/assets/videos/clip-1.mp4'),
  // require('@/assets/videos/clip-2.mp4'),
];

const REMOTE_VIDEOS: string[] = [
  "https://media.w3.org/2010/05/sintel/trailer.mp4",
  "https://media.w3.org/2010/05/bunny/trailer.mp4",
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.m3u8",
  "https://ireplay.tv/test/blender.m3u8",
];

export const TRAILERS: (string | number)[] = BUNDLED_VIDEOS.length
  ? BUNDLED_VIDEOS
  : REMOTE_VIDEOS;

/** Each "episode" plays this long, then hits the cliffhanger hand-off. Keeps the demo snappy. */
export const EPISODE_CLIP_SECONDS = 30;

export const EPISODE_COIN_COST = 85;

const TITLES = [
  "The accidental message",
  "Coffee and contracts",
  "A glimpse behind the mask",
  "The gala encounter",
  "Misunderstandings",
  "Midnight confessions",
  "The rival returns",
  "Breaking point",
  "Truth at dawn",
  "The final offer",
];

// Stable string hash: "random" per series/episode, but identical on every render and reload
const hash = (value: string): number => {
  let h = 0;
  for (let i = 0; i < value.length; i++)
    h = (Math.imul(31, h) + value.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const pickTrailer = (seriesId: string, episodeNumber: number) => {
  const offset = hash(seriesId);
  return TRAILERS[(offset + episodeNumber) % TRAILERS.length];
};

const cache = new Map<string, Episode[]>();

export const getEpisodes = (series: Series): Episode[] => {
  const cached = cache.get(series.id);
  if (cached) return cached;

  const episodes = Array.from(
    { length: series.episodeCount },
    (_, i): Episode => {
      const number = i + 1;
      return {
        id: `${series.id}-ep-${number}`,
        seriesId: series.id,
        number,
        title: TITLES[i] ?? `Episode ${number}`,
        durationSec: 100 + ((number * 37) % 140),
        thumbnail: `https://picsum.photos/seed/${series.id}-${number}/480/270`,
        videoUrl: pickTrailer(series.id, number),
        coinCost: EPISODE_COIN_COST,
      };
    },
  );

  cache.set(series.id, episodes);
  return episodes;
};
