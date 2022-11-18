const xClass = 'x'
const circleClass = 'circle'
let circleTurn
const winningCombinations =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningmessage')
const winningMessage = document.querySelector('[data-winning-text]')
const resetButton = document.getElementById('reset')
startGame()
resetButton.addEventListener('click',startGame)

function startGame(){
    //winningMessageElement.remove('show')

    circleTurn = false;
    cellElements.forEach(cell=>{
    cell.classList.remove(xClass)
    cell.classList.remove(circleClass)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click',handleClick, {once:true})})

        setBoardHoverClass()

        winningMessageElement.classList.remove('show')
}




function handleClick(e){
//placemark 
//check for win
//check for draw
//switch turns
//console.log("clicked")

const cell = e.target
const currentClass = circleTurn ? circleClass : xClass

placemark (cell , currentClass)
if(checkwin(currentClass)){
endGame(false)

}
else if(isDraw()){
    endGame(true)
}
else{
    swapTurns()
    setBoardHoverClass()
}


}


function placemark(cell , currentClass) {

cell.classList.add(currentClass)

}
function isDraw(){
 return [...cellElements].every(
    cell=>{
        return cell.classList.contains(xClass)||cell.classList.contains(circleClass)
    }
 )

}
function swapTurns(){
    circleTurn =!circleTurn
}
function setBoardHoverClass(){
   board.classList.remove(circleClass)
   board.classList.remove(xClass)
if(circleTurn){
    board.classList.add(circleClass)

}
else
   board.classList.add(xClass)
}
function checkwin(currentClass){
return winningCombinations.some(
    combinations =>{
        return combinations.every(
            index =>{
                return cellElements[index].classList.contains(currentClass)
            }
        )
    }
)


}
function endGame(draw){
    if(draw){
        winningMessage.innerText = "draw!"
        winningMessageElement.classList.add('show')
 }

    else{
    winningMessage.innerText = `${circleTurn ? "O's": "x's"} wins!`
    winningMessageElement.classList.add('show')
}
//winningMessageElement.classList.add('show')
}