const request = require('supertest')
const express = require('express')
const router = require('../server.js')

const app=express()
app.use('/',router)

 
describe('POST /api/endpoint', () => {
  it('should return a successful response', async () => {
    const response = await request(app)
      .post('/yAPI/querydata')
      .send({
        dest: "Berlin",
        date: "2024-01-01",
        country: "DE",
        fullcountry: "germany"
      })
    expect(response.statusCode).toBe(202); // Replace 200 with the expected status code
    expect(response.body).toEqual({ message: 'OK' }); // Replace { message: 'success' } with the expected response body
  });
});

  // Add more test cases as needed
