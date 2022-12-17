import React from "react";
import "../Styles/Home.css";

class Home extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div id="main">
                <nav>
                    <header className="nav_header">
                        Study Machine
                    </header>
                    <div>
                        <p>Study Machine é seu auxiliar nos estudos te entregando quantos exercícios você precisar para aprender.</p>
                        <p>Mas lembre-se que quem corre atrás é você, a verdadeira máquina de estudos!</p>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq1KXWDlvHHKAt-VMJFGQC88lDe93rCH4zoA&usqp=CAU"
                            alt="Imagem Ilustrativa" />
                    </div>
                </nav>
                <div className="body_content">
                    <div id="top" className="body_header">
                        <div className="body_subject">Como você deseja se conectar?</div>
                    </div>
                    <div className="choose_your_mode">
                        <p id="p_choose">Escolha seu modo de acesso.</p>
                        <a className="select_mode_button" href="./login?mode=aluno"> Aluno </a>
                        <a className="select_mode_button" href="./login?mode=professor"> Professor</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;