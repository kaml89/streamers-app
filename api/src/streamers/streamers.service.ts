import { AppDataSource } from '../data-source';
import { Streamer } from '../entity/streamers.model';
import { IStreamer } from './streamers.interface';

class StreamersService {
  async getAllStreamers(): Promise<any> {
    const streamers = await AppDataSource.manager.find(Streamer);
    return streamers;
  }

  async getStreamerById(id: number): Promise<any> {
    const streamer = await AppDataSource.manager.findOneBy(Streamer, {
      id: id,
    });
    return streamer;
  }

  async addStreamer(streamerInput: IStreamer): Promise<any> {
    const streamer = new Streamer();
    streamer.name = streamerInput.name;
    streamer.description = streamerInput.description;
    streamer.streamingPlatform = streamerInput.streamingPlatform;
    streamer.votes = 0;

    await AppDataSource.manager.save(streamer);
    return streamer;
  }

  async vote(id: number, vote: number): Promise<any> {
    await AppDataSource.manager.increment(Streamer, { id }, 'votes', vote);

    const streamer = await this.getStreamerById(id);

    return streamer;
  }
}

export default new StreamersService();
