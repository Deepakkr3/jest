import request from 'supertest';
import { AppDataSource } from '../config/ormConfig';
import {app} from '../app';

beforeAll(async () => {
  // Initialize the database before running tests
  await AppDataSource.initialize();
});

afterAll(async () => {
  // Close the database connection after tests are done
  await AppDataSource.destroy();
});

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test User');
  });

  it('should retrieve all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should retrieve a user by ID', async () => {
    const createUserResponse = await request(app)
      .post('/api/users')
      .send({
        name: 'User to retrieve',
        email: 'retrieve@example.com',
        password: 'password123',
      });
    const userId = createUserResponse.body.id;

    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
  });

  it('should update a user', async () => {
    const createUserResponse = await request(app)
      .post('/api/users')
      .send({
        name: 'User to update',
        email: 'update@example.com',
        password: 'password123',
      });
    const userId = createUserResponse.body.id;

    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        name: 'Updated User',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated User');
  });

  it('should delete a user', async () => {
    const createUserResponse = await request(app)
      .post('/api/users')
      .send({
        name: 'User to delete',
        email: 'delete@example.com',
        password: 'password123',
      });
    const userId = createUserResponse.body.id;

    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(204);
  });
});
