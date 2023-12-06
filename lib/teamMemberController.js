// teamMemberController.js
import { addTeamMember, getAllTeamMembers as getAllMembers } from './teamMemberService.js';

// Get all team members
const getAllTeamMembers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const teamMembers = await getAllMembers(page, limit);
        res.json(teamMembers);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
};

// Create a new team member
const createTeamMember = (req, res) => {
    const { firstName, lastName, phone, description } = req.body;
    const image = req.file;

    // Validate the input
    if (!firstName || !lastName || !phone || !description) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    const newMember = {
        id: Date.now().toString(),
        firstName,
        lastName,
        phone,
        description,
        avatarUrl: `/images/${image ? image.filename : 'default.png'}`
    };

    // Add the new member to the team
    addTeamMember(newMember);

    res.status(201).send(newMember);
};

// Handler for 'join' operation, which can be the same as creating a new member
const joinTeamMember = (req, res) => {
    createTeamMember(req, res);
};

export { getAllTeamMembers, createTeamMember, joinTeamMember };
