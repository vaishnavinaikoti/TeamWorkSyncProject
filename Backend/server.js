const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://vaishnavinaikoti:kjhgfdsa@cluster0.pnwwnn8.mongodb.net/', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const projectRouter = require('./routes/Projects')
const employeeRouter = require('./routes/Employees')
const projectassignmentRouter = require('./routes/ProjectAssignments')
const sprintRouter = require('./routes/Sprints')
const userstoryRouter = require('./routes/UserStories')
const backlogRouter = require('./routes/Backlogs')
const populateRouter = require('./routes/PopulateData')

const cors = require('cors');
app.use(express.json())
app.use(cors());

app.use('/projects', projectRouter)
app.use('/employees', employeeRouter)
app.use('/projectassignments',projectassignmentRouter)
app.use('/sprints',sprintRouter);
app.use('/userstories',userstoryRouter);
app.use('/backlogs',backlogRouter);
app.use('/populate',populateRouter);


app.listen(3000, () => console.log('Server Started'))