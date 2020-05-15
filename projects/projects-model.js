const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {
    addResource,
    getResources,
    addProject,
    getProjects,
    addTask,
    getTasks,
    getAllTasks
};

function addResource(resource) {
    return db("resources").insert(resource, "id");
}

function getResources() {
    return db("resources");
}

function addProject(project) {
    return db("projects").insert(project, "id");
}

function getProjects() {
    return db("projects");
}

function addTask(task, project_id) {
    return db("tasks")
        .join("projects", "tasks.project_id", "projects.id")
        .insert({ ...task, project_id })
        .where({ project_id: project_id });

}


function getTasks(project_id) {
    return db("tasks")
        .join("projects", "tasks.project_id", "projects.id")
        .select(
            "projects.name as Project Name",
            "projects.description as Project Description",
            "tasks.description as Task",
            "tasks.notes as Notes",
            "tasks.completed",
            "tasks.project_id as TPID",
            "projects.id as PID"
        )
        .where({ project_id: project_id });
}
function getAllTasks() {
    return db('tasks')
} 