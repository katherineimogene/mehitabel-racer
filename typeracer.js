window.onload=function(){
  gameTextDiv = document.getElementById('game-text')
  gameText = gameTextDiv.innerText
  gameTextArr = gameText.split("")
  readyDom()
  missedCharDiv = document.getElementById('missed-chars')
}

readyDom = function() {
   gameTextDiv.innerHTML = ""
  for (i=0; i<gameTextArr.length; i++){
    newSpan = document.createElement('span')
    newSpan.innerText = gameTextArr[i]
    gameTextDiv.appendChild(newSpan)
  }
}

captureInput = function(e) {
  return String.fromCharCode(e.keyCode || e.charCode)
}

counter = 0
incorrect = 0
tempMissed = 0

typeRace = function(e) {
    e.preventDefault()
    if (captureInput(e).toLowerCase() == gameTextArr[counter].toLowerCase()) {
      tempMissed = 0
      missedCharDiv.children[1].innerHTML = ""
      gameTextDiv.children[counter].classList.add('match')
      counter += 1
    } else {
    tempMissed += 1
    if (tempMissed >= 4) {
      missedCharDiv.children[1].innerHTML = gameTextArr[counter]
    }
    incorrect += 1
    missedCharDiv.children[0].innerHTML = incorrect

    }
}

document.addEventListener('keydown', function(e){
  typeRace(e)} , false)
