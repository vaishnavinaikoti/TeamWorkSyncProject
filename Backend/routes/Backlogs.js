const express = require('express');
const Backlog = require('../models/Backlog');
const Sprint = require('../models/Sprint');
const router = express.Router()

// Creating A new backlog
router.post('/', async (req, res) => {
    const backlog = new Backlog({
        project_id: req.body.project_id,
        sprint_id: null,
        employee_id: null,
        backlogId: req.body.backlogId,
        backlogTitle: req.body.backlogTitle,
        backlogDescription: req.body.backlogDescription,
        priority: req.body.priority,
        status: req.body.status
    });
    try {
        const backlogdata = await backlog.save();
        res.status(201).json(backlogdata);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//population
router.post('/populate', async (req, res) => {
    for (let i = 0; i < 10; i++) {
        const backlog = new Backlog({
            project_id: req.body.project_id,
            sprint_id: null,
            employee_id: null,
            backlogId: (Math.floor(Math.random() * 10000) + 10000)
                .toString()
                .substring(1)
                .toString(),
            backlogTitle: req.body.backlogTitle + "-" + i,
            backlogDescription: req.body.backlogDescription + "-" + i,
            priority: req.body.priority,
            status: req.body.status
        });
        await backlog.save();
    }
    res.status(201).json({
        "status": "success"
    });
})


// get all backlogs By project Id
router.get('/project/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const backlogs = await Backlog.find({ project_id: id }).populate();
        res.json(backlogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// get all backlogs By sprint Id
router.get('/sprint/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const backlogs = await Backlog.find({ sprint_id: id }).populate('employee_id');
        res.json(backlogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//update backlog with sprint
router.post('/assign', async (req, res) => {
    try {
        const sprintID = req.body.sprintId;
        const listOfBacklogs = req.body.list;
        if (req.body.list && Array.isArray(listOfBacklogs)) {
            await Promise.all(req.body.list.map(async (backlogId) => {
                const existingBacklog = await Backlog.findById(backlogId);
                if (existingBacklog) {
                    existingBacklog.sprint_id = sprintID;
                    await existingBacklog.save();
                }
            }));
        }
        res.status(201).json(listOfBacklogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//update backlog with team member
router.post('/assign/team', async (req, res) => {
    try {
        const backlogId = req.body.backlogId;
        const status = req.body.status;
        const employeeId = req.body.employeeId;
        const existingBacklog = await Backlog.findById(backlogId);
        existingBacklog.status = status;
        existingBacklog.employee_id = employeeId;
        await existingBacklog.save();

        res.status(201).json(existingBacklog);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


//update backlog status
router.post('/update', async (req, res) => {
    try {
        const backlogId = req.body.backlogId;
        const status = req.body.status;
        const existingBacklog = await Backlog.findById(backlogId);
        existingBacklog.status = status;
        await existingBacklog.save();

        res.status(201).json(existingBacklog);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});





module.exports = router