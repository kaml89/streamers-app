import "reflect-metadata";
import EventsService from './events.service';
import supertest from 'supertest';
import app from '../index';
import DbService from '../common/db.config';

const validEvent = {
  firstName: 'alsdf',
  lastName: 'lsadfj',
  email: 'rba.kaml@sldf.pl',
  date: new Date(Date.now() + 100000),
}

let request: supertest.SuperAgentTest; 

beforeAll(async () => {
  await DbService.connect();
  EventsService.addEvent(validEvent); 
  request = supertest.agent(app);
});

afterAll(() => {
});

describe('Events endpoints', () => {

  it('should GET all events', async () => {
    const response = await request.get('/events');
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
  });

  it('should create new event', async () => {
    const response = await request.post('/events').send(validEvent);
    expect(response.status).toEqual(201);
    expect(response.body.id).not.toBeFalsy();
  });

  it('should reject POST if invalid firstName', async () => {
    const invalidEvent = {
      firstName: '',
      lastName: 'lsadfj',
      email: 'rba.kaml@sldf.pl',
      date: new Date(),
    }
    const response = await request.post('/events').send(invalidEvent);
    expect(response.status).toEqual(400);
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Must be non-empty string');
  });

  it('should reject POST if invalid lastName', async () => {
    const invalidEvent = {
      firstName: 'alsdkjf',
      lastName: '',
      email: 'rba.kaml@sldf.pl',
      date: new Date(),
    }
    const response = await request.post('/events').send(invalidEvent);
    expect(response.status).toEqual(400);
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Must be non-empty string');
  });

  it('should reject POST if invalid email', async () => {
    const invalidEvent = {
      firstName: 'alsdkjf',
      lastName: 'asdff',
      email: 'rba.kamlsldf.pl',
      date: new Date(),
    }
    const response = await request.post('/events').send(invalidEvent);
    expect(response.status).toEqual(400);
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Must be valid email');
  });

  it('should reject POST if invalid date format', async () => {
    const invalidEvent = {
      firstName: 'alsdkjf',
      lastName: 'asdff',
      email: 'rba.kaml@sldf.pl',
      date: '22/20/2033',
    }
    const response = await request.post('/events').send(invalidEvent);
    expect(response.status).toEqual(400);
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Must be valid date');
  });

  it('should reject POST if date is older than current date', async () => {
    const invalidEvent = {
      firstName: 'alsdkjf',
      lastName: 'asdff',
      email: 'rba.kaml@sldf.pl',
      date: '2020-10-11T11:11:00.000Z'
    }
    const response = await request.post('/events').send(invalidEvent);
    expect(response.status).toEqual(400);
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Past dates disallowed');
  });
})