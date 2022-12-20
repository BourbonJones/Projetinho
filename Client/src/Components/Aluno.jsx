import React from "react";
import "../Styles/Aluno.css";
import materias from "../materias.json";

const urlParams = new URLSearchParams(window.location.search);
const aluno = urlParams.get("aluno");

function pegar(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

var lista_inicial = JSON.parse(pegar("http://localhost:8081/aluno/" + aluno));

class Aluno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            materias: materias.lista,
            subject_page: "Matemática",
            assuntos: lista_inicial
        };

        this.changeSubjectPage = this.changeSubjectPage.bind(this);
    }

    changeSubjectPage(e) {
        this.setState({
            subject_page: e.target.id ? e.target.id : this.state.subject_page
        });
    }

    render() {
        //Renderiza todas as materias na navbar
        var lista_materias = this.state.materias.map((materia) => (
            <ul id={materia} key={materia} onClick={this.changeSubjectPage}>{materia}</ul>
        ));

        //Renderiza assuntos da materia escolhida

        var lista_assuntos;
        if (this.state.assuntos.status === "ok") {
            lista_assuntos = this.state.assuntos.assuntos
                .filter(assunto => assunto.materia === this.state.subject_page)
                .map((assunto) => {
                    var link = "/aluno/assunto?aluno=" + aluno + "&assunto=" + assunto.nome_for_link;
                    var matriculado = assunto.matriculado ? "Sim" : "Não";
                    var tem_teste = assunto.tem_teste ? "Teste Pendente" : "Sem Testes Agendados"
                    return (
                        <li className="infos" key={assunto.nome}>
                            <div className="info"><a href={link} className="info">{assunto.nome}</a></div>
                            <div className="info">{matriculado}</div>
                            <div className="info">{tem_teste}</div>
                        </li>
                    )
                });
        }else{
            lista_assuntos = <h1 className="erro">Page Fault</h1>
        }

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
                        <div className="body_profile">Perfil</div>
                    </div>
                    <div className="body_assuntos">
                        <ul className="assuntos">
                            <li className="assuntos_header">
                                <div className="info">Assuntos</div>
                                <div className="info">Matriculado</div>
                                <div className="info">Status</div>
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