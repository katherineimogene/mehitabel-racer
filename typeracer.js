
  typeRace = function(e){
    var gameTextDiv = document.getElementById('game-text')
    var gameText = gameTextDiv.innerText
    var gameTextArr = gameText.split("")

    gameTextDiv.innerHTML = ""
    for (i=0; i<gameTextArr.length; i++){
      newSpan = document.createElement('span')
      newSpan.innerText = gameTextArr[i]
      gameTextDiv.appendChild(newSpan)
    }

    for (i=0; i<gameTextArr.length; i++){
      var input = String.fromCharCode(e.keyCode || e.charCode)
      var toMatch = gameTextArr[i]
      var currentSpan = gameTextDiv.children[i]
      if (input.downcase == gameTextArr[i].downcase) {
        currentSpan.classList.add('match')
      }
    }
  }

document.addEventListener('keydown', typeRace, false)
