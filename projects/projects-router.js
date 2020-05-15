const express = require("express");

const Projects = require("./projects-model.js");

const router = express.Router();

//Resources


router.post("/resources", (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ errorMessage: "Please provide a name for this resource." });
    } else {
        Projects.addResource(req.body)
            .then(resource => {
                res.status(201).json(resource);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: "Failed to add the resource to the list." });
            });
    }
});


router.get("/resources", (req, res) => {
    Projects.getResources()
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Could not retrieve the list of resources" });
        });
});



//Projects
router.post("/", (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ errorMessage: "Please provide a name for this project." });
    } else {
        Projects.addProject(req.body)
            .then(project => {
                res.status(201).json(projects);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: "Failed to add project to wishlist." });
            });
    }
});

router.get("/", (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500)
                .json({ errorMessage: "Could not retrieve the list of projects." });
        });
});

//Tasks
router.post("/:id/tasks", (req, res) => {
    if (!req.body.description) {
        res.status(400).json({ errorMessage: "Please provide a description for this task." });
    } else {
        Projects.addTask(req.body, req.params.id)
            .then(task => {
                if (task) {
                    res.status(201).json(task);
                } else {
                    res.status(404).json({ errorMessage: "The project with the specified id does not exist." });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: "Failed to add task to the list." });
            });
    }
});

router.get("/:id/tasks", (req, res) => {
    Projects.getTasks(req.params.id)
        .then(tasks => {
            if (tasks.length > 0) {
                res.status(200).json(tasks);
            } else {
                res.status(404).json({
                    errorMessage: "The project with the specified id does not exist, or has no associated tasks."
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Could not retrieve the list of tasks." })
        });
});

router.get("/tasks", (req, res) => {
    Projects.getAllTasks()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: "Could not retrieve tasks." })
        })
})

module.exports = router;
