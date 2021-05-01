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
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

const deck = new Deck()
deck.shuffle()
let array21 = []
const text = document.querySelector('.top-text21')
const deckElement = document.querySelector('.deck21-slot')
const firstRow = document.querySelector('.row1')
const secondRow = document.querySelector('.row2')
const thirdRow = document.querySelector('.row3')
const choice = document.querySelector('.choice')
const restart = document.querySelector('.restart')

let roundCounter = 0;

restart.addEventListener('click', () => {
    restartGame()
})

firstRow.addEventListener('click', () => {
  roundCounter++
  let temp = []
  let temp2 = []
  let temp3 = []
  var i = 0, j = 0
  while(i < 7){
    temp[i] = array21[j]
    j = j + 3
    i++
  }
  var i2 = 0, j2 = 1
  while(i2 < 7){
    temp2[i2] = array21[j2]
    j2 = j2 + 3
    i2++
  }
  var i3 = 0, j3 = 2
  while(i3 < 7){
    temp3[i3] = array21[j3]
    j3 = j3 + 3
    i3++
  }
  temp.reverse()
  temp2.reverse()
  temp3.reverse()
  clearArray()
  array21 = getTheNewArray(temp2, temp, temp3)
  clearRows()
  text.innerText = 'Which row is your card in now?'
  renderCards(array21)
})

secondRow.addEventListener('click', () => {
  roundCounter++
  let temp = []
  let temp2 = []
  let temp3 = []
  var i = 0, j = 0
  while(i < 7){
    temp[i] = array21[j]
    j = j + 3
    i++
  }
  var i2 = 0, j2 = 1
  while(i2 < 7){
    temp2[i2] = array21[j2]
    j2 = j2 + 3
    i2++
  }
  var i3 = 0, j3 = 2
  while(i3 < 7){
    temp3[i3] = array21[j3]
    j3 = j3 + 3
    i3++
  }
  temp.reverse()
  temp2.reverse()
  temp3.reverse()
  clearArray()
  array21 = getTheNewArray(temp, temp2, temp3)
  clearRows()
  text.innerText = 'Which row is your card in now?'
  renderCards(array21)
})

thirdRow.addEventListener('click', () => {
  roundCounter++
  let temp = []
  let temp2 = []
  let temp3 = []
  var i = 0, j = 0
  while(i < 7){
    temp[i] = array21[j]
    j = j + 3
    i++
  }
  var i2 = 0, j2 = 1
  while(i2 < 7){
    temp2[i2] = array21[j2]
    j2 = j2 + 3
    i2++
  }
  var i3 = 0, j3 = 2
  while(i3 < 7){
    temp3[i3] = array21[j3]
    j3 = j3 + 3
    i3++
  }
  temp.reverse()
  temp2.reverse()
  temp3.reverse()
  clearArray()
  array21 = getTheNewArray(temp, temp3, temp2)
  clearRows()
  text.innerText = 'Which row is your card in now?'
  renderCards(array21)
})

startGame()

function startGame(){
  text.innerText = 'Pick a Card, Click its row'
  for(var i=0; i < 21; i++){
    array21[i] = deck.cards[i];
  }
  renderCards(array21)

}

function clearRows(){
    firstRow.innerHTML = ''
    secondRow.innerHTML = ''
    thirdRow.innerHTML = ''
    choice.innerHTML = ''
}


function renderCards(array){
    var checker = true;
    var i = 0;
    while(checker){
      firstRow.appendChild(array[i].getHTML())
      secondRow.appendChild(array[i + 1].getHTML())
      thirdRow.appendChild(array[i + 2].getHTML())
      i = i + 3
      if(i == 21){
        checker = false
      }
    }
    if(roundCounter >= 3){
    choice.appendChild(array[10].getHTML())
    endSwitch()
    renderSwap()
    text.innerText = 'Your card has been revealed'
    }
}

function restartGame(){
  clearRows()
  deck.shuffle()
  roundCounter = 0
  startGame()
}
// This function clear the main array2 (global array)
function clearArray(){
  array21 = []
}

// This function takes in three arrays and combines them into one array, which is then returned
function getTheNewArray(front, sandwich, end){
  return front.concat(sandwich, end)
}

function endSwitch(){
    var randomNum = Math.floor(Math.random()* 20)
    var holdIt = array21[10]
    array21[10] = array21[randomNum]
    array21[randomNum] = holdIt
}

function renderSwap(){
  firstRow.innerHTML = ''
  secondRow.innerHTML = ''
  thirdRow.innerHTML = ''
  var checker = true;
  var i = 0;
  while(checker){
    firstRow.appendChild(array21[i].getHTML())
    secondRow.appendChild(array21[i + 1].getHTML())
    thirdRow.appendChild(array21[i + 2].getHTML())
    i = i + 3
    if(i == 21){
      checker = false
    }
  }
}
