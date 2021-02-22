import { Router } from 'express';

const routes = Router();

//Public routes

routes.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default routes;
