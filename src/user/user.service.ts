import { Injectable } from '@nestjs/common';
import { User } from './User';

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: '123',
    },
    {
      id: 2,
      username: 'maria',
      password: '456',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
