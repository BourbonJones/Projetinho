const Assunto = require("../Models/Assunto");

async function getAllAssuntos() {
    try {
        let assuntos = await Assunto.find();
        return ({status: "ok", response: assuntos});
    }catch(e){
        return ({status: "error", response: e});
    }
}

async function setAssunto(options) {
    try {
        let assunto = new Assunto({ nome: options.nome, resumo: options.resumo, materia: options.materia });
        await assunto.save();
        return ({status: "ok", message: "Assunto adicionado com sucesso!"});
    } catch (erro) {
        return ({status: "erro", message: erro});
    }
}

async function getAssuntoByName(options) {
    try {
        let assunto = await Assunto.find({nome: options.nome});
        return ({status: "ok", resposta: assunto});
    } catch (erro) {
        return ({status: "erro", resposta: erro});
    }
}

async function updateAssunto(options){
    try{
        let assunto = await Assunto.findOne({nome: options.nome});
        return ({status: "ok", resposta: "Resumo do Assunto " + assunto.nome + " atualizado com sucesso"});
    }catch(erro){
        return ({status: "erro", resposta: erro});
    }
}

async function deleteAssunto(options){
    try{
        await Assunto.remove({nome: options.nome});
        return {status: "ok", resposta: "Assunto " + options.nome + " removido com sucesso"};
    }catch(erro){
        return ({status: "erro", resposta: erro});
    }
}

module.exports = {
    getAllAssuntos: getAllAssuntos,
    setAssunto: setAssunto,
    getAssuntoByName: getAssuntoByName,
    updateAssunto: updateAssunto,
    deleteAssunto: deleteAssunto
}