const express = require('express');
const UserStory = require('../models/UserStory');
const Sprint = require('../models/Sprint');
const router = express.Router()

// Creating A new userstory
router.post('/', async (req, res) => {
    const userstory = new UserStory({
        name:req.body.name,
        description: req.body.description,
        status: req.body.status,
        sprint_id:req.body.sprint_id,
        employee_id:req.body.employee_id,
        comments: []
    });
    try {
        const NewUserStory = await userstory.save();
        res.status(201).json(NewUserStory);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// get all userstories By sprint Id
router.get('/sprint/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userstories = await UserStory.find({ sprint_id: id }).populate('employee_id').exec();
        res.json(userstories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router


