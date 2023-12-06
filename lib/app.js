// app.js
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { getAllTeamMembers, createTeamMember, joinTeamMember } from './teamMemberController.js';
import { fileURLToPath } from 'url';

// Derive the directory name using import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const upload = multer({ dest: 'images/' }); // Configuring multer for file uploads
app.use('/images', express.static(path.join(__dirname, 'images')));
// Middleware for parsing JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/api/v1/team-members', getAllTeamMembers);
app.post('/api/v1/team-members', upload.single('image'), createTeamMember);
app.post('/api/v1/team-members/join', upload.single('image'), joinTeamMember);

export default app
