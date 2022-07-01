
let tela = document.querySelector("body");
let quizzaleatorio;
let quizzSelecionado;
let nperguntas;
let nniveis;
todosQuizzes();
let quizzcriado = {};
let perguntascriadas = {};
let niveiscriados = {};
let n;
let quizzes;
let j;

function limpaTela() {
    tela.innerHTML = `<div class="topo">BuzzQuizz</div>`
}

function todosQuizzes () {
  const promise = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
  promise.then(selecionaQuizz);
}

function selecionaQuizz(resposta) {
  quizzaleatorio = resposta.data;
  if (localStorage.length === 0){
    geradorTela1_1 ();
  } else {
  geradorTela1_2 ();
  }
}

function geradorTela1_1 () {
  limpaTela();
  tela.innerHTML += `
  <div class="semquizz">
      <div>Você não criou nenhum<br>quizz ainda :(</div>
      <div onclick="criarQuizz()"><button>Criar Quizz</button></div>
  </div>
  <div class="quizzes">
    <p>Todos os Quizzes</p>
  </div>`;
  quizzes = document.querySelector(".quizzes");

  for (i = 0; i < 6; i++) {
    n = parseInt(Math.random()* quizzaleatorio.length);
    quizzes.innerHTML += `<div class="quizz" onclick="gerarQuizz(${quizzaleatorio[n].id})">
          <img src="${quizzaleatorio[n].image}"/>
          <div>${quizzaleatorio[n].title}</div>
      </div>`

      
  }
}

function geradorTela1_2 () {
  limpaTela();
  tela.innerHTML += `
  <div class="comquizz">
    <div class="navbar">
      <p>Seus Quizzes</p>
      <div onclick="criarQuizz()">
        <button><ion-icon name="add-sharp"></ion-icon></button>
      </div>
    </div>
    <div class="meuquizz"></div>
  </div>`
  for (let i = 0; i < localStorage.length; i++) {

  let userquizz = localStorage.getItem(`quizz${i}`);
  let quizzproprio = JSON.parse(userquizz);
  
  let meusquizzes = document.querySelector(".meuquizz");
  meusquizzes.innerHTML += `
  <div class="quizz" onclick="gerarQuizz(${quizzproprio.id})">
    <img src="${quizzproprio.image}"/>
    <div>${quizzproprio.title}</div>
  </div>`
  }

  tela.innerHTML += `
    <div class="quizzes">
      <p>Todos os Quizzes</p>
    </div>`

  for (i = 0; i < 6; i++) {
    let n = parseInt(Math.random()* quizzaleatorio.length);
    let quizzes = document.querySelector(".quizzes")
    quizzes.innerHTML += 
      `<div class="quizz" onclick="exibirQuizz()">
          <img src="${quizzaleatorio[n].image}"/>
          <div>${quizzaleatorio[n].title}</div>
      </div>`
  }
}
function criarQuizz() {
  limpaTela();
  tela.innerHTML += `
  <div class="tela3">
    <div>Comece pelo começo</div>
    <div class="personalizacao">
      <input class="title" type="text" placeholder="     Título do seu quizz">
      <input class="image" type="text" placeholder="     URL da imagem do seu quizz">
      <input class="Npergunta" type="text" placeholder="     Quantidade de perguntas do quizz">
      <input class="Nnivel" type="text" placeholder="     Quantidade de níveis do quizz">
    </div>
  <div onclick="criarPerguntas()"><button>Prosseguir pra criar perguntas</button></div>
  </div>`
}

function gerarQuizz(idQuizz){
  const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${idQuizz}`)
  promise.then(exibirQuizz)
}

function criarPerguntas() {
  quizzcriado = {
    id: 1,
    title: `${document.querySelector(".title").value}`,
    image: `${document.querySelector(".image").value}`,
    questions: [],
    levels: []
    };
  nperguntas = document.querySelector(".Npergunta").value;
  nniveis = document.querySelector(".Nnivel").value
  nperguntas = Number(nperguntas);
  limpaTela();
  tela.innerHTML += `
    <div class="tela3_2">
        <span>Crie suas perguntas</span>
    </div>`

  let tela1 = document.querySelector(".tela3_2");

  for (let i = 1; i < nperguntas + 1; i++) {
    tela1.innerHTML +=`
        <div class="caixadepergunta identify${i}">
            <div class="perguntanumero">
                <p>Pergunta ${i}</p>
                <input type="text" placeholder="   Texto da pergunta">
                <input type="text" placeholder="   Cor de fundo da pergunta">
            </div>
            <div class="caixarespcerta">
                <p>Resposta correta</p>
                <input type="text" placeholder="   Resposta Correta">
                <input type="text" placeholder="   URL da imagem">
            </div>
            <div class="caixaresperrada">
                <p>Respostas incorretas</p>
                <div class="identify1">
                    <input type="text" placeholder="   Resposta incorreta 1">
                    <input type="text" placeholder="   URL da imagem 1">
                </div>
                <div class="identify2">
                    <input type="text" placeholder="   Resposta incorreta 2">
                    <input type="text" placeholder="   URL da imagem 2">
                </div>
                <div class="identify3">
                    <input type="text" placeholder="   Resposta incorreta 3">
                    <input type="text" placeholder="   URL da imagem 3">
                </div>
            </div>
        </div>`
  }
  tela1.innerHTML += `<div onclick="escolherNivel()"><button>Prosseguir pra criar níveis</button></div>`
}

function salvaPerguntas() {
  for(let y = 1; y < (nperguntas + 1); y++) {
      perguntascriadas = {
      title: `${document.querySelector(`.identify${y} .perguntanumero input:nth-child(2)`).value}`,
      color: `${document.querySelector(`.identify${y} .perguntanumero input:nth-child(3)`).value}`,
      answers: [
        {
          text: `${document.querySelector(`.identify${y} .caixarespcerta input:nth-child(2)`).value}`,
          image: `${document.querySelector(`.identify${y} .caixarespcerta input:nth-child(3)`).value}`,
          isCorrectAnswer: true
        },
        {
          text: `${document.querySelector(`.identify${y} .caixaresperrada .identify1 input:nth-child(1)`).value}`,
          image: `${document.querySelector(`.identify${y} .caixaresperrada .identify1 input:nth-child(2)`).value}`,
          isCorrectAnswer: false
        },
        {
          text: `${document.querySelector(`.identify${y} .caixaresperrada .identify2 input:nth-child(1)`).value}`,
          image: `${document.querySelector(`.identify${y} .caixaresperrada .identify2 input:nth-child(2)`).value}`,
          isCorrectAnswer: false
        },
        {
          text: `${document.querySelector(`.identify${y} .caixaresperrada .identify3 input:nth-child(1)`).value}`,
          image: `${document.querySelector(`.identify${y} .caixaresperrada .identify3 input:nth-child(2)`).value}`,
          isCorrectAnswer: false
        }
      ]
    }
    quizzcriado.questions.push(perguntascriadas);
  }
}

function escolherNivel() {
  salvaPerguntas();
  nniveis = Number(nniveis);
  limpaTela();

  tela.innerHTML += `
      <div class="tela3_3">
        <span>Agora, decida os níveis</span>
      </div>`;
  
  let tela1 = document.querySelector(".tela3_3");

  for (let z = 1; z < (nniveis+1); z++){
    tela1.innerHTML +=`
    <div class="caixaniveis identify${z}">
            <div class="niveis">
                <div>Nível ${z}</div>
                <input type="text" placeholder="   Título do nível">
                <input type="text" placeholder="   % de acerto mínima">
                <input type="text" placeholder="   URL da imagem do nível">
                <input type="text" placeholder="   Descrição do nível">
            </div>
        </div>`
  }
  tela1.innerHTML += `<div onclick="enviaQuizz()"><button>Finalizar Quizz</button></div>`;
}

function salvaNiveis (){
  for (let l = 1; l < nniveis + 1; l++) {
    niveiscriados = {
      title: `${document.querySelector(`.identify${l} .niveis input:nth-child(2)`).value}`,
      image: `${document.querySelector(`.identify${l} .niveis input:nth-child(4)`).value}`,
      text: `${document.querySelector(`.identify${l} .niveis input:nth-child(5)`).value}`,
      minValue: `${document.querySelector(`.identify${l} .niveis input:nth-child(3)`).value}`
    }
    quizzcriado.levels.push(niveiscriados);
  }
}

function enviaQuizz() {
  salvaNiveis();
  //let promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzcriado);
  //promise.then(sucessoCriacao);
  //promise.catch(deuRuim)
  j = localStorage.length;
  dadosSerializados = JSON.stringify(quizzcriado);
  localStorage.setItem(`quizz${j}`, dadosSerializados);
  sucessoCriacao();
}

function deuRuim () {
  alert("deu ruim no quizz, reinicia a página");
}
function sucessoCriacao() {
  limpaTela ();
  tela.innerHTML += `
  <div class="tela3_4">
        <span>Seu quizz está pronto!</span>
        <div class="quizz">
            <img
              src="${quizzcriado.image}"
            />
            <div>${quizzcriado.title}</div>
        </div>
        <div onclick="gerarQuizz"><button>Acessar Quizz</button></div>
        <div class="botaohome" onclick="todosQuizzes()"><button>Voltar pra Home</button></div>
    </div>`
}

function exibirQuizz(resposta){
  let quizz = resposta.data;
  limpaTela();
  tela.innerHTML += `
  <div class="titulo-quizz">
    <img src=${quizz.image}>
    <h2>${quizz.title}</h2>
  </div>
  <div class="perguntas">
  </div>`
  gerarPerguntas(quizz.questions);
}

let alternativas = '';

function gerarPerguntas(perguntas){
  perguntas.sort(() => Math.random() - 0.5);
  let questoes = tela.querySelector('.perguntas');
  for (let i = 0; i < perguntas.length; i++){
    gerarRespostas(perguntas[i].answers);
    questoes.innerHTML += `
      <div class="pergunta">
        <div class="titulo">
            <h3>${perguntas[i].title}</h3>
        </div>
        <div class="alternativas">
          ${alternativas}
        </div>
      </div>`
      alternativas = '';
  }
}

function gerarRespostas(respostas){
  respostas.sort(() => Math.random() - 0.5);
  for(let i = 0; i < respostas.length; i++){
    alternativas +=`
    <div class="alternativa">
      <img src=${respostas[i].image}>
      <strong>${respostas[i].text}</strong>
    </div>`
  }
}