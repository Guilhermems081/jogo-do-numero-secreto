//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let numeroSorteado = [];
let numeroMax = 50;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativa = 1;

function exibirTextoNaTela (tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirTextoInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

exibirTextoInicial();

function verificarChute() {
  let chute = document.querySelector('input').value;
  
  if(chute == numeroAleatorio) {
    exibirTextoNaTela('h1', 'Acertou');
    let palavraTentativa = tentativa > 1? 'tentativas' : 'tentativa';
    let mensagemTentativa = `Você descobriu o número secreto com ${tentativa} ${palavraTentativa}`;
    exibirTextoNaTela('p', `${mensagemTentativa}`);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if(chute > numeroAleatorio) {
      exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior');
    }
    //tentativa = tentativa + 1;
    tentativa++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroMax + 1);
  let limitedenumero = numeroSorteado.length;

  if(limitedenumero == numeroMax) {
    numeroSorteado = [];
  }

  if(numeroSorteado.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    numeroSorteado.push(numeroEscolhido);
    console.log(numeroSorteado);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';  
}

function reiniciarJogo() {
  numeroAleatorio = gerarNumeroAleatorio();
  limparCampo();
  tentativa = 1;
  //exibirTextoNaTela('h1', 'Jogo do número secreto');
  //exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
  exibirTextoInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}
