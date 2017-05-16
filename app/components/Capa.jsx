const React = require('react');
const Autores = require('./Autores.jsx');
const Titulo = require('./Titulo.jsx');
const Ano = require('./Ano.jsx');

class Capa extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        instituicao: "Sua Instituição",
        volume: "",
        cidade: "Florianópolis",
    };
  }
  render() {
    let self = this;
    return (
    <div className="capa">
      <input type="text" className="instituicao" placeholder="Sua instituicao" onChange={(e) => { this.setState({instituicao: e.target.value}); }} value={this.state.instituicao}></input>

      <Autores />

      <Titulo />
      <input type="text" className="volume" placeholder="Volume" onChange={(e) => { this.setState({volume: e.target.value}); }} value={this.state.volume}></input>

      <input type="text" className="cidade" placeholder="Cidade" onChange={(e) => { this.setState({cidade: e.target.value}); }} value={this.state.cidade}></input>
      <Ano />
    </div>
    );
  }
}

module.exports = Capa;
