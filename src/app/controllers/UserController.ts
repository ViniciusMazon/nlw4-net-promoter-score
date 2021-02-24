import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    try {
      const userRepository = getCustomRepository(UserRepository);

      const userAlreadyExists = await userRepository.findOne({ email });
      if (userAlreadyExists) {
        throw new Error('User already exists');
      }

      const user = await userRepository.create({ name, email });
      await userRepository.save(user);

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

export { UserController };
