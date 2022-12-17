const Aluno = require("../Models/Aluno");

async function createAluno(options){
    let aluno = new Aluno({ nome: options.nome, assuntos: options.assuntos});
    try{
        await aluno.save();
        return "Aluno adicionado com sucesso!";
    }catch(erro){
        return erro;
    }
}

async function getAluno(options){
    let aluno = await Aluno.findOne({nome: options.nome});
    return aluno;
}

async function updateAluno(options){
    try{

    }catch(erro){
        return erro;
    }
}


module.exports = {
    createAluno: createAluno,
    getAluno: getAluno,
    updateAluno: updateAluno
}