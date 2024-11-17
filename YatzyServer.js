const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const router = express.Router();
app.use(express.static('Public')); // Serve static files from 'public' directory

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+ "/Yatzy.Html"));
});

//Listen for port
app.use('/', router);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});