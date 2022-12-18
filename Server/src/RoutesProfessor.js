
const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const { Assunto, Aluno, Professor } = require("./Database");

//BODY PARSER
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

//ROUTES
var dir_name = "/professor/";

routes.get(dir_name, async (req, res) => {

    let assuntos = await Assunto.getAllAssuntos();

    if (assuntos.status == 'ok') {
        let lista = assuntos.response;
        let resposta = {
            status: assuntos.status,
            assuntos: []
        }

        for (let i in lista) {
            let body = {
                nome: lista[i].nome,
                nome_for_link: lista[i].nome.replaceAll(" ", "_"),
                materia: lista[i].materia,
            }

            resposta.assuntos.push(body);
        }
        res.send(resposta);
    }
});

routes.post(dir_name + "assuntos", async (req, res) => {
    let assunto = {
        nome: req.body.nome ? req.body.nome : null,
        resumo: req.body.resumo ? req.body.resumo : null,
        materia: req.body.materia ? req.body.materia : null
    };
    let message = await Assunto.setAssunto(assunto);
    res.send(message);
});

routes.patch(dir_name + "assuntos", async (req, res) => {
    let assunto = {
        typeEdition: req.body.typeEdition,
        nome: req.body.nome,
        resumo: req.body.resumo,
        exercicios: req.body.exercicios
    }
    let message = await Assunto.updateResumoAssunto(assunto);
    res.send(message);
});


module.exports = routes;