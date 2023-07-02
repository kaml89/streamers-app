import express from 'express';
import { StreamingPlatforms } from './streamers.interface';

class StreamersMiddleware {
  async validateVotes(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const vote = req.body.vote;
    if (vote !== 1 && vote !== -1) {
      res.status(400).send({ error: 'Incorrect vote value' });
    } else {
      next();
    }
  }

  async validateStreamerId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const id = req.params.streamerId;

    const n = Math.floor(Number(id));
    if (n !== Infinity && String(n) === id && n >= 0) {
      next();
    } else {
      res.status(400).send({ error: 'Incorrect id' });
    }
  }
}

export default new StreamersMiddleware();
