const Professor = require("../Models/Professor");

async function setProfessor(options){
    let professor = new Professor({ nome: options.nome, senha: options.senha});
    try{
        await professor.save();
        return "Professor adicionada com sucesso!";
    }catch(erro){
        return erro;
    }
}

async function getProfessor(options){
    let professor = await Professor.findById(options.id);
    return professor;
}


module.exports = {
    setProfessor: setProfessor,
    getProfessor: getProfessor
}