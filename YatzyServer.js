const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises; // Use promises for async file operations

const DATA_FILE = 'ServerData/Data.json';

// Enable CORS for all requests
app.use(cors());
// Middleware
app.use(bodyParser.json());

const router = express.Router();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/ServerData/Data.json"));
});

// Helper: Read JSON file
const readData = async () => {
    try {
        const rawData = await fs.readFile(DATA_FILE, 'utf-8'); // Async read
        return JSON.parse(rawData) || [];
    } catch (error) {
        console.error('Error reading data file:', error);
        return [];
    }
};

// Helper: Write JSON file
const writeData = async (data) => {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2)); // Async write
    } catch (error) {
        console.error('Error writing data file:', error);
    }
};

// GET: Fetch all data
app.get('/data', async (req, res) => {
    try {
        const data = await readData(); // Wait for file read
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

// GET: Fetch a specific value by name
app.get('/data/:name', async (req, res) => {
    try {
        const data = await readData(); // Wait for file read
        const item = data.find((entry) => entry.name === req.params.name);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: `No data found for name: ${req.params.name}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

// PUT: Update value by name
app.put('/data/:name', async (req, res) => {
    try {
        const data = await readData(); // Wait for file read
        const { value } = req.body;
        const index = data.findIndex((entry) => entry.name === req.params.name);

        if (index !== -1) {
            data[index].value = value;
            await writeData(data); // Wait for file write
            res.json({ message: 'Value updated', data: data[index] });
        } else {
            res.status(404).json({ message: `No data found for name: ${req.params.name}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error });
    }
});

// POST: Add a new object { name: "variable_name", value: any }
app.post('/data', async (req, res) => {
    try {
        const data = await readData(); // Wait for file read
        const { name, value } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({ message: 'Invalid data. "name" is required.' });
        }

        // Check if the name already exists
        const existing = data.find((entry) => entry.name === name);
        if (existing) {
            return res.status(409).json({ message: `An entry with the name "${name}" already exists.` });
        }

        // Add new object
        const newItem = { name, value };
        data.push(newItem);
        await writeData(data); // Wait for file write

        res.status(201).json({ message: 'Data added successfully', data: newItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding data', error });
    }
});

// DELETE: Remove an object by name
app.delete('/data/:name', async (req, res) => {
    try {
        const data = await readData(); // Wait for file read
        const name = req.params.name;

        // Filter out the object with the specified name
        const filteredData = data.filter((entry) => entry.name !== name);

        // Check if anything was deleted
        if (filteredData.length !== data.length) {
            await writeData(filteredData); // Wait for file write
            res.json({ message: `Data deleted for name: ${name}` });
        } else {
            res.status(404).json({ message: `No data found for name: ${name}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error });
    }
});

// Listen for port
app.use('/', router);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
