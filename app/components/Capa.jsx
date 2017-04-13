const React = require('react');

let Capa = React.createClass({

  // adicionar autor
  handleKeyPressAutores: function(e) {
    if(e.which == 13) {

      $(".autores").append('<div><input type="text" ref="autor" className="autor" class="autor" placeholder="Autores" name="autor" /></div>');

      // fazer o foco ir para o proximo elemento
      let input = $(".autores").find('input:visible');
      let indice = input.index(e.target) + 1;
      let seletor = $(input[indice]).focus();
    }

    $('.autor').keydown(function(e) {
      let keyCode = e.keyCode;
      let valor = $(this).val();

      // verificando se a tecla precionada é backspace e se o campo está vazio
      if (keyCode == 8 && valor == ''){
        let input = $(".autores").find('input:visible');
        let indice = input.index(e.target) - 1;
        let seletor = $(input[indice]).focus();

        // verifica se existe mais de um autor, se tiver deixa remover
        if($(".autor").length > 1){
          $(this).parent('div').remove();
        }
      }
    });
  },

  //aumentar o tamanho do textarea conforme conteudo
  handleTitulo: function() {
    $(".titulo").bind("input", function(e) {
      while( $(this).outerHeight() < this.scrollHeight && $(this).height() < 500) {
        $(this).height($(this).height()+1);
      };
    });

    // retonar ao height padrão
    if(this.refs.titulo.value == ''){
      $(".titulo").css('height', '25px');
    }
  },

  // erro data inválida
  handleOnChangeAno: function(e){
    let ano = this.refs.ano.value;
    // anos 1000 até 2999
    let ExpReg = /^[12][0-9]{3}$/;

    if($(".alert").length){
      if(ExpReg.test(ano)){
        $('.alert').remove();
      }
    }else{
      if(!(ExpReg.test(ano))){
        $('.capa').append('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> Digite um ano válido!</div>');
      }
    }
    // se o campo ano estiver vazio, tira o erro
    if(ano == ''){
      $('.alert').remove();
    }
  },
  render: function() {
    return (
    <div className="capa">
      <input type="text" className="instituicao" placeholder="Sua instituicao"></input>

      <div className="autores" onKeyPress={this.handleKeyPressAutores}>
        <div>
          <input className="autor" type="text" placeholder="Autores" name="autor"></input>
        </div>
      </div>

      <textarea rows="1" className="titulo" ref="titulo" placeholder="Titulo" onKeyUp={this.handleTitulo}></textarea>

      <input type="text" className="volume" placeholder="Volume"></input>

      <input type="text" className="cidade" placeholder="Cidade"></input>

      <input type="text" maxLength="4" ref="ano" onChange={this.handleOnChangeAno} className="ano" id="ano" placeholder="Ano"></input>

    </div>
    );
  }
});

module.exports = Capa;
