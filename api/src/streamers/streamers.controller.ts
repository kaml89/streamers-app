import express from 'express';
import StreamersService from './streamers.service';

class StreamersController {
  async getStreamers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const streamers = await StreamersService.getAllStreamers();
    res.status(200).send(streamers);
    // next();
  }

  async getStreamer(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const streamer = await StreamersService.getStreamerById(
      Number(req.params.streamerId)
    );
    res.status(200).send(streamer);
    // next();
  }

  async addStreamer(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const newStreamer = await StreamersService.addStreamer(req.body);
    res.status(201).send(newStreamer);
    // next();
  }

  async vote(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const streamer = await StreamersService.vote(
      Number(req.params.streamerId),
      Number(req.body.vote)
    );
    res.status(201).send(streamer);
    // next();
  }
}

export default new StreamersController();
