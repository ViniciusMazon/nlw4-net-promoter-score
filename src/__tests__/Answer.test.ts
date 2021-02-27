import request from 'supertest';
import app from '../app';
import createConnection from '../database';

describe('Answer', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to send a new answer', async () => {
    const survey = await request(app)
      .post('/surveys')
      .send({ title: 'Title Example', description: 'Description example' });

    const user = await request(app)
      .post('/users')
      .send({ email: 'user1@example.com', name: 'User Example' });

    const surveyUser = await request(app)
      .post('/send-mail')
      .send({ email: 'user1@example.com', survey_id: survey.body.id });

    const response = await request(app)
      .get(`/answers/10?u=${surveyUser.body.id}`)
      .send({ email: 'user1@example.com', survey_id: survey.body.id });

    expect(response.status).toBe(200);
    expect(response.body.value).toBe(10);
  });
});
