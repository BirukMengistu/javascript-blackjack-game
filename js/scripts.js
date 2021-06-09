 
// card gameobject for state information
 let cardGame ={

    "player":{"scoreSpan": "#player-result",
             "div":"#player-box","score":0},
    "dealer":{"scoreSpan": "#dealer-result",
             "div":"#dealer-box","score":0},

     "cards":["2","3","4","5"," 6","7","8","9","10","K","Q","J","A"],
     "cardsMap":{"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8, 
                "9":9, "10":10,"J":10,"k":10, "Q":10 , "A":[1,11]}
 } 
    
const PLAYER = cardGame['player'];
const DEALER = cardGame['dealer'];
const hitSound = new Audio('sounds/swish.m4a');

const btnHit = document.querySelector('#btn-cardGame-hit');
const btnStand = document.querySelector('#btn-cardGame-stand');
const btnDeal = document.querySelector('#btn-cardGame-deal');

btnHit.addEventListener('click' , cardHit)
btnStand.addEventListener('click' , cardStand)
btnDeal.addEventListener('click' ,CardDeal)



function cardHit(){
    let card = randomCard();
   showCard(PLAYER,card) ;
   updateScore(card,PLAYER)
   showScore(PLAYER);
   console.log(PLAYER['score']);
    
}

function showCard(activePlayer , card){
    let cardImage = document.createElement('img')
    cardImage.src= `./image/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}
function cardStand(){
    alert('clicked the Stand')
}

function CardDeal(){
    let playerImage = document.querySelector('#player-box').querySelectorAll('img');
    let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img') ;
    
    removeImage(playerImage ,dealerImage)
}


function removeImage(PlayerImage , dealerImage)
{
  for (i = 0 ; i< PlayerImage.length; i++)
  PlayerImage[i].remove();

  for (i = 0 ; i< activePlayerImage.length; i++)
  dealerImage[i].remove();
}

function randomCard()
{
   let randomIndex= Math.floor(Math.random()*13);
   return cardGame['cards'][randomIndex];
}
function updateScore(card, activePlayer)
{
 activePlayer['score'] += cardGame['cardsMap'][card]
}

function showScore(activePlayer){
document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}