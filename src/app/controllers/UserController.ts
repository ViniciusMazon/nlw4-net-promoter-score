import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    try {
      const userRepository = getRepository(User);

      const userAlreadyExists = await userRepository.findOne({ email });
      if (userAlreadyExists) {
        throw new Error('User already exists');
      }

      const user = await userRepository.create({ name, email });
      await userRepository.save(user);

      return response.status(201).send();
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

export { UserController };
