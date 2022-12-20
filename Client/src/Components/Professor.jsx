import React from "react";
import Modal from "react-modal";
import "../Styles/Aluno.css";
import "../Styles/Professor.css";
import materias from "../materias.json";

function pegar(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

Modal.setAppElement('#root');

var lista_inicial = JSON.parse(pegar("http://localhost:8081/professor/"));

class Aluno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            materias: materias.lista,
            subject_page: "Matemática",
            assuntos: lista_inicial,
            url_padrao: "https://localhost:3000",
            modal_open: false,
            modal_mode: "",
            modal_assunto: ""
        };

        this.changeSubjectPage = this.changeSubjectPage.bind(this);
        this.deleteAssunto = this.deleteAssunto.bind(this);
        this.sendAssunto = this.sendAssunto.bind(this);

        this.handleOpenCreateMode = this.handleOpenCreateMode.bind(this);
        this.handleOpenEditMode = this.handleOpenEditMode.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    changeSubjectPage(e) {
        this.setState({
            subject_page: e.target.id ? e.target.id : this.state.subject_page
        });
    }

    deleteAssunto(e) {
        e.preventDefault();
        var body = {
            nome: e.target.value.replaceAll(" ", "_")
        }

        console.log(body);
    }

    sendAssunto(e) {
        e.preventDefault();
        var assunto;
        if(this.state.modal_mode === "create"){
            assunto = e.target.elements.assunto.value
        }else{
            assunto = this.state.modal_assunto
        }

        var body = {
            typeEdition: this.state.modal_mode,
            nome: assunto.replaceAll(" ", "_"),
            resumo: e.target.elements.resumo.value,
            exercicio: e.target.elements.exercicio.value,
            letraA: e.target.elements.letraA.value,
            letraB: e.target.elements.letraB.value,
            letraC: e.target.elements.letraC.value,
            letraS: e.target.elements.letraD.value,
            letraE: e.target.elements.letraE.value,
            resposta: e.target.elements.resposta.value
        }

        console.log(body);
    }

    handleOpenCreateMode() {
        this.setState({
            modal_open: true,
            modal_mode: "create"
        });
    }

    handleOpenEditMode(e) {
        this.setState({
            modal_open: true,
            modal_mode: "edit",
            modal_assunto: e.target.value
        });
    }

    handleClose() {
        this.setState({
            modal_open: false,
            modal_mode: ""
        });
    }

    render() {
        //Renderiza todas as materias na navbar
        var lista_materias = this.state.materias.map((materia) => (
            <ul id={materia} key={materia} onClick={this.changeSubjectPage}>{materia}</ul>
        ));

        //Renderiza assuntos da materia escolhida
        var lista_assuntos = this.state.assuntos.assuntos
            .filter(assunto => assunto.materia === this.state.subject_page)
            .map((assunto) => (
                <li className="infos" key={assunto.nome}>
                    <div className="info">{assunto.nome}</div>
                    <button className="edit" type="button" value={assunto.nome} onClick={this.handleOpenEditMode}>Editar</button>
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
                        <button id="inserir_assunto" type="button" onClick={this.handleOpenCreateMode}>Inserir Assunto</button>
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
                <Modal isOpen={this.state.modal_open} onRequestClose={this.handleClose} className="popup">
                    <div className="modal_header">
                        <div className="popup_name">
                            <div>{ this.state.modal_mode === "create" && (<div>Inserir Assunto</div>) } </div>
                            <div>{ this.state.modal_mode === "edit" && (<div>Editar Assunto</div>) } </div>
                        </div>
                        <div><button onClick={this.handleClose}>Fechar</button></div>
                    </div>
                    <form onSubmit={this.sendAssunto} className="popup_body">
                        <div className="body_item">
                            <div className="body_label">Assunto:</div>
                            <div>{ this.state.modal_mode === "create" && (<input name="assunto" placeholder="Assunto"></input>) } </div>
                            <div>{ this.state.modal_mode === "edit" && (<div>{this.state.modal_assunto}</div>) } </div>
                        </div>
                        <div className="body_item">
                            <div className="body_label">Resumo:</div>
                            <div><input name="resumo" type="file"/></div>
                        </div>
                        <div className="body_item">
                            <div className="body_label">Adicionar Exercício:</div>
                            <div><input name="exercicio" type="file" /></div>
                        </div>
                        <div id="body_alternativas">
                            <div><input name="letraA" placeholder="letra A"></input></div>
                            <div><input name="letraB" placeholder="letra B"></input></div>
                            <div><input name="letraC" placeholder="letra C"></input></div>
                            <div><input name="letraD" placeholder="letra D"></input></div>
                            <div><input name="letraE" placeholder="letra E"></input></div>
                        </div>
                        <div className="body_item">
                            <div className="body_label">Resposta:</div>
                            <div><input name="resposta" placeholder="Resposta"></input></div>
                        </div>
                        <div>
                            <button type="submit"> Enviar </button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default Aluno;