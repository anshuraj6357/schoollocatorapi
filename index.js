
const express = require('express');
const dotenv = require('dotenv');

const schoolRouter = require('./router/school')
const userRouter=require('./router/user')
const cookieparser=require('cookie-parser')
const cors=require('cors')
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(cookieparser())
app.use(cors());
app.use(express.json())

app.use('/api/v1/school', schoolRouter)
app.use('/api/v1/user', userRouter)
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running and DB connected'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
