import Deck from "./deck.js"

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 10,
    "Q": 10,
    "K": 10,
    "A": 11,
}

const computerDeckElement = document.querySelector('.bj-dealer-hand')
const playerDeckElement = document.querySelector('.bj-player-hand')
const stay = document.querySelector('.stay')
const restartButton = document.querySelector('.restart')
const hitmeButton = document.querySelector('.deckbj-slot')
const text = document.querySelector('.text')

let deck;
let playerHand = new Array(10)
let computerHand = new Array(10)
let inRound = false;
let staying = false;

restartButton.addEventListener('click', () => {
    startGame();
})

stay.addEventListener('click', () => {
    if(inRound == false) return;

    staying = true;
    let totalValue = 0;

    for (let i = 0; i < playerHand.length; i++) {
        totalValue += CARD_VALUE_MAP[playerHand[i].value];

        if(typeof playerHand[i+1] === 'undefined') break;

    } 
    if(totalValue > 21) totalValue = recalculateDeck(totalValue, playerHand);

    computerBrain(totalValue);
})
hitmeButton.addEventListener('click', () => {
    if(inRound == false){
        startGame();
        return;
    }
    if(staying) return;

    let totalValue = 0;

    console.log(playerHand);

    for (let i = 0; i < playerHand.length; i++) {
        totalValue += CARD_VALUE_MAP[playerHand[i].value];

        if(typeof playerHand[i+1] === 'undefined'){
            playerHand[i+1] = deck.pop();
            playerDeckElement.appendChild(playerHand[i+1].getHTML())
            totalValue += CARD_VALUE_MAP[playerHand[i+1].value];
            break;
        }

    } 
    if(totalValue > 21) totalValue = recalculateDeck(totalValue, playerHand);
    if(totalValue > 21) gameOver(true);


})

function gameOver(playerLost){
    if(playerLost){
        text.innerText = 'You Lose!'
    }
    else {
        text.innerText = 'You Win!'
    }

    staying = false;
    inRound = false;
    hitmeButton.innerText = "Play";
    showGameOverText();
}

function recalculateDeck(totalValue, hand){
    for (let i = 0; i < hand.length; i++) {

        if(typeof hand[i] === 'undefined') break;
        if(hand[i].value === 'A')
        totalValue -= 10;

        if(totalValue <= 21) break;

    } 

    return totalValue
}
async function computerBrain(playerValue = 0){
    let totalValue = 0;

    for (let i = 0; i < computerHand.length; i++) {
        totalValue += CARD_VALUE_MAP[computerHand[i].value];

        if(totalValue > 21) totalValue = recalculateDeck(totalValue, computerHand);
        if(totalValue > 21){
            gameOver(false);
            break;
        }

        if(totalValue >= playerValue){ 
            gameOver(true);
            break;
        }

        if(typeof computerHand[i+1] === 'undefined'){
    
            await dramaticPause(2500, 550);
    
            computerHand[i+1] = deck.pop();
            computerDeckElement.appendChild(computerHand[i+1].getHTML())
        }
    } 
}

function startGame(){
    text.style.visibility = "hidden";
    
    deck = new Deck()
    deck.shuffle()
    deck.shuffle()
    deck.shuffle()

    playerHand = new Array(15)
    computerHand = new Array(15)
    
    cleanBeforeRound()
    dealCards()
    inRound = true;
    hitmeButton.innerText = "Hit Me";
}
async function dealCards(){
    playerHand[0] = deck.pop()
    computerHand[0] = deck.pop()
    playerHand[1] = deck.pop()
    computerHand[1] = deck.pop()

    // Deal two cards
    for(let i=0; i<2; i++){
        playerDeckElement.appendChild(playerHand[i].getHTML())
        await dramaticPause(1500, 550);
        computerDeckElement.appendChild(computerHand[i].getHTML())    
        await dramaticPause(1500, 550);
    }

    checkBlackjack()
}

function checkBlackjack(){
    let totalPlayerValue = 0;
    let totalComputerValue = 0;

    for (let i = 0; i < 2; i++) {
        totalPlayerValue += CARD_VALUE_MAP[playerHand[i].value];
        totalComputerValue += CARD_VALUE_MAP[computerHand[i].value];
    } 

    if(totalPlayerValue == 21 || totalComputerValue == 21){
        
        text.innerText = 'Blackjack! ' + totalComputerValue == 21 ? 'You Lose!' : 'You Win!';
        staying = false;
        inRound = false;
        hitmeButton.innerText = "Play";
        showGameOverText();
    
    }
}
function showGameOverText(){
    let width = computerDeckElement.offsetWidth;
    let height = computerDeckElement.offsetHeight * 2;

    text.style.width = width + "px";
    text.style.height = height + "px";

    text.style.visibility = "visible";

}
function cleanBeforeRound(){
    computerDeckElement.innerHTML = ''
    playerDeckElement.innerHTML= ''
}
function dramaticPause(ms, range=0) {
    if(range != 0){
        ms = Math.random() * ((ms+range) - (ms-range > 0 ? ms-range : 0)) + (ms-range);
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}
