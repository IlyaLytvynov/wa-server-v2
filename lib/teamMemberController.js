// teamMemberController.js
import { addTeamMember, getAllTeamMembers as getAllMembers } from './teamMemberService.js';

// Get all team members
const getAllTeamMembers = async (page = 1, limit = 10) => {
    await loadData();
    
    // Calculate the starting index
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Return a subset of the team members array
    return data.teamMembers.slice(startIndex, endIndex);
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
