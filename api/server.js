const express = require("express")

// const RecipeRouter = require('./recipes/recipes-router');

const server = express();

server.use(express.json());
// server.use('/api/projects', RecipeRouter)

module.exports = server;