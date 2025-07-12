const express = require('express')
const router = express.Router()
const Project = require('../models/Project')
const Employee = require('../models/Employee')
const ProjectAssignment = require('../models/ProjectAssignment')


router.get('/:id', async (req, res) => {
    try{
        const { project_id } = req.params.id;
        const employees = await ProjectAssignment.findOne({ project: project_id }).populate('employees');
        res.json(employees);
    }catch(error)
    {   
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// get projects based on employee id.
router.get('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const projectAssignments = await ProjectAssignment.find({ employees: id }).populate('project');
        const projects = projectAssignments.map(assignment => assignment.project);
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//get employess based on Project id
router.get('/project/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const projectAssignments = await ProjectAssignment.find({ project: id }).populate('employees');
        const employees = projectAssignments.map(assignment => assignment.employees);
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//get projects based on employee id
router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const projects =  await ProjectAssignment.find({ employees: id }).populate('project');
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});





router.put('/', async (req, res) => {
    try {
        const { project_id, employees_id } = req.body;
        await ProjectAssignment.updateOne(
            { project: project_id },
            { $addToSet: { employees: employees_id } }
        );
        res.status(201).json({ message: 'Assignment created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})






module.exports = router