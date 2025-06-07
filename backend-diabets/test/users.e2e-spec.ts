import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { UsersModule } from '../src/infra/modules/users.module';
import { UsersRepositoryInterface } from '../src/domain/interfaces/users.interface';
import { CreateUserDto } from '../src/application/dto/create-user.dto';
import { RawUserSimple } from '../src/domain/mappers/users.mapper';

class UsersRepositoryMock implements UsersRepositoryInterface {
  private users: any[] = [];

  async findOne(userId: number): Promise<any> {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      capillary_blood_glucose: user.capillary_blood_glucose,
    };
  }

  async findOneEmail(email: string): Promise<boolean> {
    const exists = this.users.some((u) => u.email === email);
    return !exists;
  }

  async findOneEmailLogin(email: string): Promise<any> {
    return this.users.find((u) => u.email === email);
  }

  async createUser(user: CreateUserDto): Promise<RawUserSimple> {
    const newUser = {
      id: this.users.length + 1,
      email: user.email,
      name: user.name,
      password: user.password,
      avatar: '',
      capillary_blood_glucose: [],
    };
    this.users.push(newUser);
    return { id: newUser.id, email: newUser.email, name: newUser.name, avatar: '' };
  }
}

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider('USERS_REPOSITORY')
      .useClass(UsersRepositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST)', async () => {
    const dto: CreateUserDto = { email: 'test@example.com', name: 'Test', password: 'secret' };

    const response = await request(app.getHttpServer()).post('/users').send(dto);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, email: dto.email, name: dto.name, avatar: '' });
  });

  it('/users/:id (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId', 1);
    expect(response.body).toHaveProperty('email', 'test@example.com');
    expect(response.body).toHaveProperty('name', 'Test');
  });
});
