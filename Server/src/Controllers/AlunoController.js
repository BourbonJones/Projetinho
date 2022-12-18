const Aluno = require("../Models/Aluno");

async function createAluno(options){
    try{
        let aluno = new Aluno({ nome: options.nome, senha: options.senha, assuntos: options.assuntos});
        await aluno.save();
        return {status: "ok", message: "Aluno adicionado com sucesso!"};
    }catch(erro){
        return {status: "ok", message: erro};
    }
}

async function getAluno(options){
    try{
        let aluno = await Aluno.findOne({nome: options.nome});
        if(aluno)
            return {status: "ok", resposta: aluno};
        return {status: "erro", resposta: "Error: Aluno is not found."};
    }catch(erro){
        return {status: "erro", resposta: erro};
    }
}

async function updateAlunoAssuntoAtributo(options){
    try{
        let aluno = await Aluno.findOne({nome: options.nome})
        let assunto = options.assunto;
        if(options.matricular == false){ //Se é opção de se DESmatricular
            aluno.assuntos = aluno.assuntos.filter(assunto => assunto.assunto != options.assunto.assunto);
            aluno.save();
            return {status: "ok", message: "Assunto " + options.assunto.assunto + " desmarcardo com sucesso"};
        }
        else{//Se é opção de se matricular
            aluno.assuntos.push(options.assunto);
            aluno.save();
            return {status: "ok", message: "Assunto " + options.assunto.assunto + " marcardo com sucesso"};
        }
    }catch(erro){
        return {status: "erro", message: erro}
    }
}


module.exports = {
    createAluno: createAluno,
    getAluno: getAluno,
    updateAlunoAssuntoAtributo: updateAlunoAssuntoAtributo
}