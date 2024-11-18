const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const fs = require('fs');

const DATA_FILE = 'ServerData/Data.json'; 

// Enable CORS for all requests
app.use(cors());
// Middleware
app.use(bodyParser.json());

const router = express.Router();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+ "/ServerData/Data.json"));
});
 
// Helper: Read JSON file
const readData = () => {
    try {
        const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(rawData) || [];
    } catch (error) {
        console.error('Error reading data file:', error);
        return [];
    }
};

// Helper: Write JSON file
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing data file:', error);
    }
};

// GET: Fetch all data
app.get('/data', (req, res) => {
    const data = readData();
    res.json(data);
});

// GET: Fetch a specific value by name
app.get('/data/:name', (req, res) => {
    const data = readData();
    const item = data.find((entry) => entry.name === req.params.name);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: `No data found for name: ${req.params.name}` });
    }
});

// PUT: Update value by name
app.put('/data/:name', (req, res) => {
    const data = readData();
    const { value } = req.body;
    const index = data.findIndex((entry) => entry.name === req.params.name);

    if (index !== -1) {
        data[index].value = value;
        writeData(data);
        res.json({ message: 'Value updated', data: data[index] });
    } else {
        res.status(404).json({ message: `No data found for name: ${req.params.name}` });
    }
});


//Listen for port
app.use('/', router);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});