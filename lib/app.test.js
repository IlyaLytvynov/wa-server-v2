// app.test.js
import  request from 'supertest';
import  app from './app.js';

describe('E2E Tests for Team Member API', () => {
    it('GET /api/v1/team-members should return an array of team members', async () => {
        const response = await request(app).get('/api/v1/team-members');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

   fit('POST /api/v1/team-members should create a new team member', async () => {
        // Mock data for a new team member
        const newMember = {
            firstName: "John",
            lastName: "Doe",
            phone: "1234567890",
            description: "A new team member",
            // Note: Handling file uploads in tests might require additional setup
        };

        const response = await request(app)
            .post('/api/v1/team-members')
            .send(newMember); // Adjust as needed for file upload
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    // Add more tests as needed
});
