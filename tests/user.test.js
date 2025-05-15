const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/db');

let userId;
let token;
const testEmail = `testuser_${Date.now()}@example.com`;

describe('Wallet System API Tests', () => {
  afterAll(() => {
    db.end();
  });

  test('Create a new user', async () => {
    const res = await request(app)
      .post('/user')
      .send({ name: 'Test User', email: testEmail });

    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('id');
    userId = res.body.user.id;
  });

  test('Login with created user', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: testEmail });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test('Add money to wallet', async () => {
    const res = await request(app)
      .post('/transaction')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'ADD', amount: 1000 });

    expect(res.statusCode).toBe(201);
    expect(parseFloat(res.body.balance)).toBeGreaterThanOrEqual(1000);
  });

  test('Withdraw money from wallet', async () => {
    const res = await request(app)
      .post('/transaction')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'WITHDRAW', amount: 300 });

    expect(res.statusCode).toBe(201);
    expect(parseFloat(res.body.balance)).toBeGreaterThanOrEqual(700);
  });

  test('Get user details', async () => {
    const res = await request(app).get(`/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(testEmail);
  });

  test('Get transaction history', async () => {
    const res = await request(app)
      .get(`/user/${userId}/transactions`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.transactions.length).toBeGreaterThan(0);
  });
});
