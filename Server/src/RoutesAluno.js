const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const { Assunto, Aluno, Professor } = require("./Database");

//BODY PARSER
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

//ROUTES
var dir_name = "/aluno/";

routes.get(dir_name + ":aluno", async (req, res) => {
    let db_aluno = await Aluno.getAluno({ nome: req.params.aluno });
    let aluno;
    if (db_aluno.status == "ok") {
        aluno = db_aluno.resposta;

        let matriculas = aluno.assuntos;

        let matriculas_nome = [];
        let matriculas_teste = [];
        for (let i in matriculas) {
            matriculas_nome.push(matriculas[i].assunto);
            matriculas_teste.push(matriculas[i].tem_teste);
        }

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

                let index = matriculas_nome.indexOf(lista[i].nome);
                if (index != -1) {
                    body.matriculado = true;
                    body.tem_teste = matriculas_teste[index];
                }
                else {
                    body.matriculado = false;
                    body.tem_teste = false;
                }

                resposta.assuntos.push(body);
            }
            res.send(resposta);
        }
        else {
            res.send(assuntos);
        }
    }
    else{
        res.send(db_aluno);
    }


});

routes.get(dir_name + "matriculas", (req, res) => {
    res.send('Matriculas');
});

routes.post(dir_name + "matriculas", async (req, res) => {
    let aluno = {
        nome: req.body.nome,
        senha: req.body.senha,
        assuntos: req.body.assuntos
    }
    let message = await Aluno.createAluno(aluno);
    res.send(message);
});

routes.patch(dir_name + "matriculas", async (req, res) => {
    let aluno = {
        nome: req.body.nome,
        matricular: req.body.matricular,
        assunto: req.body.assunto
    }
    let message = await Aluno.updateAlunoAssuntoAtributo(aluno);
    res.send(message);
});

routes.delete(dir_name + "matriculas", async (req, res) => {
    let aluno = {
        nome: req.body.nome
    };
    let message = await Aluno.deleteAluno(aluno);
    res.send(message);
});


module.exports = routes;