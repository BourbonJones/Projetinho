import React from "react";
import "../Styles/Aluno.css";
import materias from "../materias.json";

const urlParams = new URLSearchParams(window.location.search);
const assunto = urlParams.get("assunto");
console.log("assunto:", assunto);


class Aluno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assunto_atual: assunto.replaceAll("_"," ")
        };
    }

    render() {

        return (
            <div id="main">
                <nav>
                    <header className="nav_header">
                        Study Machine
                    </header>
                </nav>
                <div className="body_content">
                    <div id="top" className="body_header">
                        <div className="body_subject">{this.state.assunto_atual}</div>
                        <div className="body_profile">Perfil</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Aluno;