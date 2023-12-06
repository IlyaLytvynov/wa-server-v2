import fs from 'fs/promises';
import fsSync from 'fs'; // Only for existsSync
import path from 'path';
import { fileURLToPath } from 'url';

// Derive the directory name using import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Construct the path to data.json relative to the current file
const dataPath = path.join(__dirname, '../data.json');
let data = {
    teamMembers: [],
    feedback: []
};

// Load existing data from the file
const loadData = async () => {
    if (fsSync.existsSync(dataPath)) {
        try {
            const fileData = await fs.readFile(dataPath, 'utf8');
            data = JSON.parse(fileData);
        } catch (error) {
            console.error("Error reading the data file:", error);
            throw error; // rethrow the error for the caller to handle
        }
    }
};

// Save data to the file
const saveData = async () => {
    try {
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing to the data file:", error);
        throw error; // rethrow the error for the caller to handle
    }
};

// Add a new team member
const addTeamMember = async (member) => {
    await loadData();
    data.teamMembers.push(member);
    await saveData();
};

// Get all team members
const getAllTeamMembers = async (page = 1, limit = 10) => {
    await loadData();
    
    // Calculate the starting index
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Return a subset of the team members array
    return data.teamMembers.slice(startIndex, endIndex);
};

export { addTeamMember, getAllTeamMembers };
