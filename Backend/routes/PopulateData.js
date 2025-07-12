const express = require('express')
const { faker } = require('@faker-js/faker');
const router = express.Router();
const Employee = require('../models/Employee');
const Project = require('../models/Project');
const ProjectAssignment = require('../models/ProjectAssignment');
const Backlog = require('../models/Backlog');

router.post('/', async (req, res) => {
    var priority = ["Important", "Moderate Priority", "High Priority", "Low Priority"]
    try {
        for (var i = 0; i < 15; i++) {
            const teamMember = getRandomEmployee();
            await teamMember.save();
        }
        for (var i = 0; i < 6; i++) {
            const project = getRandomProject();
            await project.save();
            const newProjectAssignment = new ProjectAssignment({
                project: project._id,
                employees: []
            });
            await newProjectAssignment.save();
            for (var backlogcount = 0; backlogcount < 40; backlogcount++) {
                const backlog = getRandomBacklog(project._id, priority[Math.floor(Math.random() * 4)]);
                await backlog.save();
            }
        }
        res.status(201).json("success")
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/', async (req, res) => {

    try {
        const project = getRandomBacklog("Vaishnavi", "1");
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



function getRandomEmployee() {
    const firstname = faker.helpers.fake(
        '{{person.firstName}}'
    );
    const employee = new Employee({
        first_name: firstname,
        last_name: faker.helpers.fake(
            '{{person.lastName}}'
        ),
        email: firstname + "@gmail.com",
        password: firstname,
        phone_number: faker.phone.number(),
        address: faker.location.streetAddress({ useFullAddress: true }),
        hire_date: new Date(),
        role: "DEVELOPER",
        salary: 1500,
        working_status: "Active",
        manager_id: "123",
        empid: (Math.floor(Math.random() * 10000) + 10000)
            .toString()
            .substring(1)
            .toString(),
    });
    return employee;
}

function getRandomProject() {
    const project = new Project({
        project_name: faker.name.jobTitle() + " Project",
        project_description: faker.lorem.paragraph(5),
        project_manager: "Manager",
        total_story_points: 1000,
        completed_story_points: 0,
        project_status: 'Active',
        start_date: new Date(),
        end_date: "2030-01-01T00:00:00.000+00:00"
    });
    return project;
}

function getRandomBacklog(projectid, priority) {
    const backlog = new Backlog({
        project_id: projectid,
        sprint_id: null,
        employee_id: null,
        backlogId: (Math.floor(Math.random() * 10000) + 10000)
            .toString()
            .substring(1)
            .toString(),
        backlogTitle: "Work on " + faker.lorem.sentence(),
        backlogDescription: faker.lorem.paragraph(5),
        priority: priority,
        status: "New"
    });
    return backlog;
}

module.exports = router