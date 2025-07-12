const express = require('express');
const Sprint = require('../models/Sprint');
const router = express.Router()


// Creating A new sprint
router.post('/', async (req, res) => {
    const sprint = new Sprint({
        project_id:req.body.project_id,
        sprint_name: req.body.sprint_name,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    });
    try {
        const NewSprint = await sprint.save();
        res.status(201).json(NewSprint);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// get all sprints By project Id
router.get('/project/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sprints = await Sprint.find({ project_id: id }).populate('sprints');
        res.json(sprints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//get sprint by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sprint = await Sprint.findById( id );
        res.json(sprint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router