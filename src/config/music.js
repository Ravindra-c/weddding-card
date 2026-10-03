/* =====================================================================
   MUSIC  —  change the song here.
   Option A (YouTube):  paste any YouTube link below.
   Option B (local MP3): put a file at public/assets/music/wedding.mp3
                         and leave youtubeUrl as a placeholder.
   If youtubeUrl is not a valid YouTube link, the MP3 is used instead.
   If both fail, the website keeps working normally.
   ===================================================================== */

export const YOUTUBE_MUSIC_URL = '[https://youtu.be/sm_Pmbw_a5s?si=t8a-OdcGy7VI_YJC]'; // e.g. https://www.youtube.com/watch?v=XXXXXXXXXXX
export const LOCAL_MUSIC_URL = '/assets/music/wedding.mp3';

export const musicConfig = {
  enabled: true,
  youtubeUrl: YOUTUBE_MUSIC_URL,
  audioUrl: LOCAL_MUSIC_URL,
  volume: 0.6, // 0 to 1
  loop: true,
};
