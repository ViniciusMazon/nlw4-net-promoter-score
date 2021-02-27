import request from 'supertest';
import app from '../app';
import createConnection from '../database';

describe('SendMail', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to send a new email', async () => {
    const survey = await request(app)
      .post('/surveys')
      .send({ title: 'Title Example', description: 'Description example' });

    const response = await request(app)
      .post('/send-mail')
      .send({ email: 'user@example.com', survey_id: survey.body.id });

    expect(response.status).toBe(201);
    expect(response.body.survey_id).toBe(survey.body.id);
  });
});
