// Server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../Client')); // serve frontend files

// For testing server
app.get('/api', (req, res) => {
    res.send('Server is running');
});

// Start server
const PORT =3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
