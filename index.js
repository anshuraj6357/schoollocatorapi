// server.js
const express = require('express');
const dotenv = require('dotenv');

const schoolRouter = require('./router/school')
const cors=require('cors')
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

app.use('/api/v1/school', schoolRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running and DB connected'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
