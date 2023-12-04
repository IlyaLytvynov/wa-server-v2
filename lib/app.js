// app.js
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { getAllTeamMembers, createTeamMember, joinTeamMember } from './teamMemberController.js';

const app = express();
const upload = multer({ dest: 'images/' }); // Configuring multer for file uploads

// Middleware for parsing JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/api/v1/team-members', getAllTeamMembers);
app.post('/api/v1/team-members', upload.single('image'), createTeamMember);
app.post('/api/v1/team-members/join', upload.single('image'), joinTeamMember);

export default app
