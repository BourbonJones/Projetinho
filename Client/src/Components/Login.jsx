import React from "react";
import "../Styles/Home.css";
import "../Styles/Login.css";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.redirctToModeHome = this.redirctToModeHome.bind(this);
    };

    redirctToModeHome(event){
        event.preventDefault();
        var url_string = window.location.href;
        var url = new URL(url_string);
        var mode_user = url.searchParams.get("mode");
        
        if(mode_user){
            window.location.replace('./' + mode_user);
        }
    }

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
                    <form className="choose_your_mode">
                        <label>Usuário: <input type="text" placeholder="user" /></label>
                        <label>Senha: <input type="text" placeholder="password" /></label>
                        <button type="submit" onClick={this.redirctToModeHome}>Logar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;