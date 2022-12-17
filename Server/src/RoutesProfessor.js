
const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const {Assunto, Aluno, Professor } = require("./Database");

//BODY PARSER
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

//ROUTES
var dir_name = "/professor/";

routes.get(dir_name, (req, res) => {
    res.send('Hello World');
});

routes.get(dir_name + "matriculas", (req, res) => {
    res.send('Matriculas');
});


module.exports = routes;