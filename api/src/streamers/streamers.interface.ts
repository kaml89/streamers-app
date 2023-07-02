export interface IStreamer {
  name: string;
  description: string;
  streamingPlatform: StreamingPlatform;
  votes: number;
}

export enum StreamingPlatforms {
  twitch = 'Twitch',
  youtube = 'YouTube',
  tiktot = 'TikTok',
  kick = 'Kick',
  rumble = 'Rumble',
}

export type StreamingPlatform =
  | 'Twitch'
  | 'Youtube'
  | 'TikTok'
  | 'Kick'
  | 'Rumble';
