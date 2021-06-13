 
// card gameobject for state information
 let cardGame ={

    "player":{"scoreSpan": "#player-result",
             "div":"#player-box","score":0},
    "dealer":{"scoreSpan": "#dealer-result",
             "div":"#dealer-box","score":0},

     "cards":['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
     "cardsMap":{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8, 
                '9':9,'10':10,'K': 10,'Q': 10, 'J': 10 , 'A': [ 1 , 11 ]},
 
     "win": 0,
     "loss":0,
      "draw":0,

 
            }; 
    
const PLAYER = cardGame['player'];
const DEALER = cardGame['dealer'];
const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

const btnHit = document.querySelector('#btn-cardGame-hit');
const btnStand = document.querySelector('#btn-cardGame-stand');
const btnDeal = document.querySelector('#btn-cardGame-deal');

btnHit.addEventListener('click' , cardHit)
btnStand.addEventListener('click' ,dealerLogic)
btnDeal.addEventListener('click' ,CardDeal)



function cardHit(){
    let card = randomCard();
    showCard(PLAYER,card) ;
    updateScore(card,PLAYER);
    bustGame(PLAYER);

    
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
    showResult( computerWinner())
   
    let playerImage = document.querySelector('#player-box').querySelectorAll('img');
    let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img') ;
    document.querySelector('#player-result').textContent= 0;
    document.querySelector('#dealer-result').textContent= 0;
   
    removeImage(playerImage ,dealerImage)
}


function removeImage(PlayerImage , dealerImage)
{
  for (i = 0 ; i< PlayerImage.length; i++){
    PlayerImage[i].remove();   

  }

 

  for (i = 0 ; i< dealerImage.length; i++)
  {
    dealerImage[i].remove();   
  }
 
  PLAYER['score'] = 0;
  DEALER['score'] = 0;
}

function randomCard()
{
   let randomIndex= Math.floor(Math.random()*13);
   console.log(randomIndex)
  // console.log(cardGame['cards'][randomIndex])
   return cardGame['cards'][randomIndex];

}
function updateScore(card, activePlayer)
{
    //by defualt As card has to value , so base on the rules As will charge 11 if 
    //the cards score below 10 As value 11 other wise As value 1.
    if(card === 'A'){
        if(activePlayer['score'] + cardGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += cardGame['cardsMap'][card][1];
        }
       else{
            activePlayer['score'] += cardGame['cardsMap'][card][0];
        }

    }
    else{
        activePlayer['score'] += cardGame['cardsMap'][card]
    }
   
 
}

function showScore(activePlayer){
document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}

function bustGame(activePlayer){
 if(activePlayer['score'] > 21)
 {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'bust'
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    //document.querySelector('#btn-cardGame-hit').disabled = true;
 }

 
 else
 showScore(activePlayer);
}

function dealerLogic(){
    let card = randomCard();
    showCard(DEALER,card) ;
    updateScore(card,DEALER);
    bustGame(DEALER);
    
}


// function to count the match , to update player or dealer winer.
function computerWinner()
{
    let winner ;
    if(PLAYER['score'] <= 21){
        // condition : higher score than dealer  or when dealer busts but your are winner.
        if(PLAYER['score'] > DEALER['score'] || (DEALER['score']>21))
           {
            cardGame['win']++;
            winner = PLAYER;
           }
        else if(PLAYER['score'] < DEALER['score']){
            cardGame['loss']++;
            winner = DEALER;
        }
        else if(PLAYER['score'] === DEALER['score']){
            cardGame['draw']++;
           winner= 'draw'
        }
     }
    else if(PLAYER['score'] < DEALER['score'])
    {
        cardGame['loss']++;
    winner = DEALER;
      }
else if(PLAYER['score'] > 21 && DEALER['score'] <=21 )
    {
        cardGame['loss']++;
    winner = DEALER;
   
     }
    else if(PLAYER['score'] > 21 && DEALER['score'] > 21 ){
        cardGame['draw']++;
    winner = 'draw'
   
     }
 console.log('winner is',winner)  ;
 return winner;   
}


function showResult(winner){
    let message, messageColor;
    if((winner === PLAYER))
    {
    message = 'PLayer WON'
    document.querySelector('#player-win').textContent = cardGame['win'];
    messageColor = 'green'
    winSound.play();
    }
    else if(winner === DEALER)
    {
        message = 'Player Lost'
        document.querySelector('#player-loss').textContent = cardGame['loss'];
        messageColor = 'red'
        lossSound.play();
    }
    else{
        {
            message = 'Player draw'
            document.querySelector('#player-draw').textContent = cardGame['draw'];
            messageColor = 'black'
           
            }
    }
document.querySelector('#blackjack-result').textContent = message;
document.querySelector('#blackjack-result').style.color=messageColor;



}