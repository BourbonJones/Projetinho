import React from "react";
import "../Styles/Aluno.css";
import "../Styles/Professor.css";
import materias from "../materias.json";

function pegar(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

var lista_inicial = JSON.parse(pegar("http://localhost:8081/aluno/Teste_2"));

class Aluno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            materias: materias.lista,
            subject_page: "Matemática",
            assuntos: lista_inicial,
            url_padrao: "https://localhost:3000"
        };

        this.changeSubjectPage = this.changeSubjectPage.bind(this);
        this.deleteAssunto = this.deleteAssunto.bind(this);
        this.editAssunto = this.editAssunto.bind(this);
    }

    changeSubjectPage(e) {
        this.setState({
            subject_page: e.target.id ? e.target.id : this.state.subject_page
        });
    }

    deleteAssunto(e){
        console.log("Deletar o", e.target.value);
    }

    editAssunto(e){
        var value = e.target.value;
        value = value.replaceAll(" ","_");
        console.log(value);
    }

    render() {
        //Renderiza todas as materias na navbar
        var lista_materias = this.state.materias.map((materia) => (
            <ul id={materia} key={materia} onClick={this.changeSubjectPage}>{materia}</ul>
        ));

        //Renderiza assuntos da materia escolhida
        var lista_assuntos = this.state.assuntos.assuntos
        .filter(assunto => assunto.materia == this.state.subject_page)
        .map((assunto) => (
            <li className="infos" key={assunto.nome}>
                <div className="info">{assunto.nome}</div>
                <button className="edit" type="button" value={assunto.nome} onClick={this.editAssunto}>Editar</button>
                <button className="delete" type="button" value={assunto.nome} onClick={this.deleteAssunto}>Excluir</button>
            </li>
        ));
        return (
            <div id="main">
                <nav>
                    <header className="nav_header">
                        Study Machine
                    </header>
                    {lista_materias}
                </nav>
                <div className="body_content">
                    <div id="top" className="body_header">
                        <div className="body_subject">{this.state.subject_page}</div>
                        <button id="inserir_assunto" type="button">Inserir Assunto</button>
                    </div>
                    <div className="body_assuntos">
                        <ul className="assuntos">
                            <li className="assuntos_header">
                                <div className="info">Todos os assuntos de {this.state.subject_page}</div>
                            </li>
                            {lista_assuntos}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Aluno;