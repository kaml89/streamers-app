import { CommonRoutesConfig } from '../common/common.routes.config';
import StreamersController from './streamers.controller';
import { body } from 'express-validator';
import BodyValidationMiddleware from '../common/body.validation.middleware';
import StreamersMiddleware from './streamers.middleware';

import express from 'express';

export class StreamersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'StreamersRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/streamers`).get(StreamersController.getStreamers).post(
      body('name')
        .isString()
        .notEmpty()
        .withMessage('Must be non-empty string'),
      body('description')
        .isString()
        .notEmpty()
        .withMessage('Must be non-empty string'),
      body('streamingPlatform')
        .isString()
        .withMessage('Must be valid streaming platform'),

      BodyValidationMiddleware.verifyBodyFieldsErrors,
      StreamersController.addStreamer
    );

    this.app
      .route(`/streamers/:streamerId`)
      .get(
        StreamersMiddleware.validateStreamerId,
        StreamersController.getStreamer
      );
    this.app
      .route(`/streamers/:streamerId/vote`)
      .put(
        StreamersMiddleware.validateStreamerId,
        StreamersMiddleware.validateVotes,
        StreamersController.vote
      );

    return this.app;
  }
}
