import request from 'supertest';
import app from '../app';
import createConnection from '../database';

describe('NPS', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to calculate the nps', async () => {
    const survey = await request(app)
      .post('/surveys')
      .send({ title: 'Title Example', description: 'Description example' });

    await request(app)
      .post('/users')
      .send({ email: 'user11@example.com', name: 'User Example' });

    const surveyUser1 = await request(app)
      .post('/send-mail')
      .send({ email: 'user11@example.com', survey_id: survey.body.id });

    await request(app)
      .get(`/answers/10?u=${surveyUser1.body.id}`)
      .send({ email: 'user11@example.com', survey_id: survey.body.id });

    await request(app)
      .post('/users')
      .send({ email: 'user12@example.com', name: 'User Example' });

    const surveyUser2 = await request(app)
      .post('/send-mail')
      .send({ email: 'user12@example.com', survey_id: survey.body.id });

    await request(app)
      .get(`/answers/10?u=${surveyUser2.body.id}`)
      .send({ email: 'user12@example.com', survey_id: survey.body.id });

    const response = await request(app).get(`/nps/${survey.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.nps).toBe(100);
    expect(response.body.promoters).toBe(2);
    expect(response.body.detractors).toBe(0);
    expect(response.body.passives).toBe(0);
    expect(response.body.totalAnswers).toBe(2);
  });
});
