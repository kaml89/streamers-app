export type Streamer = {
  id: number;
  name: string;
  description: string;
  streamingPlatform: StreamingPlatform;
  imageURL?: string;
  votes: number;
};

export type StreamerInput = Pick<
  Streamer,
  'name' | 'description' | 'streamingPlatform'
>;

// export type Streamer {

// }

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
