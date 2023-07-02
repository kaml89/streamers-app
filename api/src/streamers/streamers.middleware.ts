import express from 'express';
import { StreamingPlatforms } from './streamers.interface';

class StreamersMiddleware {
  async validateVotes(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const vote = req.body.vote;
    console.log(vote);
    if (vote !== 1 && vote !== -1) {
      res.status(400).send({ error: 'Incorrect vote value' });
    } else {
      next();
    }
  }
}

export default new StreamersMiddleware();
