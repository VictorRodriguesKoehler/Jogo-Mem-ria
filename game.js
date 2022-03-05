let game = {

    lockMode: false,

    firstCard: null,

    secondCard: null,

    techs: ['abra',
    'pikachu',
    'gengar',
    'squirtle',
    'charmander',
    'ditto',
    'mew',
    'mewtwo',
    'snorlax', 
    'bulbasaur'],

    // // os itens abaixo estavam na pasta ScriptProcessorNode, porém, são pertenentes a parte lógica do jogo.
// as funções se tornaram metodos

    // criara a variavel cards de modo nulo, sem nada, para ser usada quando necessário
    cards: null,

    setCard: function(id) {

    let card =  this.cards.filter(card => card.id === id) [0];
console.log(card);
    if (card.flipped || this.lockMode){
        return false;
    }
    if(!this.firstCard){
        this.firstCard = card;
        this.firstCard.flipped = true;
        return true;
    }else{
        this.secondCard = card;
        this.secondCard.flipped = true;
        this.lockMode = true;
        return true;
    }

    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },
    
    checkGameOver(){
       return this.cards.filter(card => !card.flipped).length == 0;

    },


     createCardsFromTechs: function(techs){
        this.cards = [];
        // // para cada uma das techs - criar duas cartas
        this.techs.forEach((tech) => {
         // pegar cada tech criar um 'pair'
        this.cards.push(this.createPairFromTech(tech));
         // essa função vai ser criada a seguir
        })
        this.cards = this.cards.flatMap(pair => pair);
        //    flatMap desmembra o array em varios elementos, nesse caso 20 cartas
       this.shuffleCards();
       return this.cards;
    },
        
     createPairFromTech: function(tech){
        // vai retornar dois objetos
        return [{
        // criar um id com um valor randômico que vai ser concatenado com o valor da tech
        
        id: this.createIdWithTech(tech), 
        // função que vai trazer um valor randômico 
        icon: tech,
        flipped: false,
        // a carta começa sempre não virada - false
        },{
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped:false,
        }]
        },
        
        // criar agora a id 
        
      createIdWithTech: function(tech){
        // retornar uma concatenação que une a tech + um número randomico entre 0 e 1
        return tech + parseInt(Math.random() * 1000);
        // parceInt transforma número quebrados em inteiros
        // multiplicar o número aleatório entre 0 e 1 por 1000
        
        },
        // criar agora uma função para embaralhar as cartas "shuffleCards" embaralhando "cards"
shuffleCards: function(cards){
    // para fazer a aleatoriedade das cartas, eu vou precisar saber qual é o index atual(currentIndex), e ele vai começar com o último index (cards.length)
   let currentIndex = this.cards.length;
    // e vo precisar de um index aleatório (random) que vai começar com 0 pois não há necessidade de especificar já que vai ficar aleatório
   let randomIndex = 0; 
   
   while(currentIndex !== 0){
   // explicando - enquanto o index atual for diferente de 0, eu vou gerar um index aleatório. Eu só posso pegar cartas que ainda não tenham sido embaralhadas, eu uso o currentIndex 
   // o Math.floor é para arredondar para baixo o valor decimal, para que gera um numero inteiro exemplo: numero entre 0 e 4, nunca vai dar 4, pode dar 3,9999 mas com floor vai ser 3
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex --;
   
   // vamos inverter os valores
   [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
   }
   
   }
}



