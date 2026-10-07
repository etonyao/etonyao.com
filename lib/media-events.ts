/** Fired on window whenever a video on the page starts playing, so other media (the music player) can pause. */
export const VIDEO_PLAY_EVENT = "site:video-play";
export const announceVideoPlay = () => window.dispatchEvent(new Event(VIDEO_PLAY_EVENT));
