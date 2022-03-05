const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

// a seguir vou chamar a função startGame, ele vai criar as cartas e vai colocar dentro da função cards
startGame();

function startGame(){
// essa função vai criar as cartas pegando as techs e embaralhar com a função shuffle
// chamar a função initialize que vai pegar o modelo das cartas e transformar em algo visual
initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards){
// vou chamar o elemento pelo id que vai ser o gameboard
let gameBoard = document.getElementById("gameBoard");
gameBoard.innerHTML = '';
game.cards.forEach(card => {
// para cada uma das cartas eu vou criar com js o elemento

let cardElement = document.createElement('div');
// vou atribuir uma id para cada carta
cardElement.id = card.id;
// vou adicionar a classe 'card' que está na pré estrutura no html 
cardElement.classList.add(CARD);
// agora, para saber se duas cartas são iguais, eu preciso ver se os icones não iguais
cardElement.dataset.icon = card.icon;

createCardContent(card, cardElement);

// preciso colocar um evento de click que sempre que clicar a carta vai flipar, pra isso vou chamar a função flipcard
cardElement.addEventListener('click', flipCard);
// agora eu preciso colocar a carta no tabuleiro
gameBoard.appendChild(cardElement);

})

}

// vou criar uma função para fazer o conteudo do card onde eu vou chamar o meu front e back
function createCardContent(card, cardElement){
    
createCardFace(FRONT, card, cardElement);
createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element){
let cardElementFace = document.createElement('div');
cardElementFace.classList.add(face);

if(face === FRONT){
// se for front vai retornar a imagem
let iconElement = document.createElement('img');
    iconElement.classList.add(ICON);
  iconElement.src = "./images/" + card.icon + ".png";
cardElementFace.appendChild(iconElement);

}else{
// se for back vai retornar o esse símbolo
cardElementFace.innerHTML = "";
}
element.appendChild(cardElementFace);
}

function flipCard() {

     if (game.setCard(this.id)){

    this.classList.add("flip");
    if(game.secondCard){
    if (game.checkMatch()){
         game.clearCards();
        if (game.checkGameOver()){
            let gameOverLayer = document.getElementById("gameOver");
            gameOverLayer.style.display = 'flex';
        }
     }else{
         setTimeout(() => {

         let firstCardsView = document.getElementById(game.firstCard.id);
         let secondCardView = document.getElementById(game.secondCard.id);

         firstCardsView.classList.remove('flip');
         secondCardView.classList.remove('flip');
         game.unflipCards();
        }, 1000);
     };
    }
     }
}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
            gameOverLayer.style.display = 'none';
}

